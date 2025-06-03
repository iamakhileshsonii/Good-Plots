import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// GENERATE ACCESS & REFRESH TOKEN
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating Access & Refresh Tokens ||| ${error}`
    );
  }
};

//REFRESH ACCESS TOKEN
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefresh = req.cookies.refreshToken || req.body.refreshToken;

    console.log(`INCOMING REFRESH TOKEN: ${incomingRefresh}`);
    if (!incomingRefresh) {
      throw new ApiError(401, "Unauthorized request!!!");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(
        incomingRefresh,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new ApiError(401, "Invalid refresh token!!!");
    }

    console.log(`DECODED TOKEN: ${JSON.stringify(decodedToken?.id)}`);

    const user = await User.findById(decodedToken?.id);

    console.log("DECODED USER:", user);

    if (!user) {
      throw new ApiError(
        401,
        "Unauthorized request, User with received token doesn't exist!!!"
      );
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token Refreshed!!!"
        )
      );
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new ApiError(
      401,
      error?.message || "Something went wrong while refreshing access token!!!"
    );
  }
});

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { salutation, username, email, fullname, password, phone, role } =
    req.body;
  const avatar = req.file;

  console.log("USER REGISTERING WITH SALUTATION: ", salutation);
  // Check if any of the required fields are empty
  if (
    [username, email, fullname, password, phone, role].some(
      (field) => !field || (typeof field === "string" && field.trim() === "")
    )
  ) {
    throw new ApiError(401, "All fields are required!!!");
  }

  if (!avatar) {
    throw new ApiError(401, "Avatar is required");
  }

  // User with email already exists
  const userExist = await User.findOne({ email });

  // Upload Avatar
  const avatarLocalPath = avatar.path;
  const uploadAvatar = await uploadOnCloudinary(avatarLocalPath);

  if (!uploadAvatar || !uploadAvatar.url) {
    throw new ApiError(401, "Couldn't upload avatar on cloudinary");
  }

  if (userExist) {
    throw new ApiError(409, "User with email already exists!!!");
  }

  const user = await User.create({
    salutation: salutation,
    username: username,
    email: email,
    fullname: fullname,
    password: password,
    phone: phone,
    role: role,
    avatar: uploadAvatar.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -accessToken"
  );

  if (!createdUser) {
    throw new ApiError(409, "Unable to create new user!!!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  // Get email and password
  // Check if user with email already exist
  // Check if the password provided by the user is correct
  // Login user

  const { email, password } = req.body;

  if ([email, password].some((field) => !field || field.trim === "")) {
    throw new ApiError(401, "All fields are required!!!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiResponse(401, {}, "Invalid Password"));
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Generate accessToken
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "None", // Necessary for cross-origin requests
    expires: new Date(Date.now() + 86400000), // Expires in 1 day
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .cookie("test", "Akhilesh")
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "User logged in successfully"
      )
    );
});

//CHECK AUTH
const checkAuth = asyncHandler(async (req, res) => {
  try {
    const authUser = await User.findById(req.user._id);

    if (!authUser) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized request"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, authUser, "Auth User fetched successfully"));
  } catch (error) {
    console.error("Something went wrong while checking auth", error);
  }
});

// LOGOUT USER
const logoutUser = asyncHandler(async (req, res) => {
  const authId = req.user._id;
  try {
    if (!authId) {
      throw new ApiError(401, "Unauthorized request");
    }
    const user = await User.findByIdAndUpdate(
      authId,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    console.log("Unable to logout user", error);
  }
});

// UPDATE PASSWORD
const updatePassword = asyncHandler(async (req, res) => {
  // Check if the new password is not same as old password
  // Update password

  const { oldPassword, newPassword } = req.body;

  if (
    [oldPassword, newPassword].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(401, "All fields are required!!!");
  }

  const isPasswordValid = user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(409, "Password is incorrect!!!");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(
      409,
      "New password should be different from old password!!!"
    );
  }

  const user = User.findByIdAndUpdate;

  user.password = newPassword;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

//GET CURRENT USER INFO
const currentUserInfo = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "Current user information fetched successfully"
      )
    );
});

//GET PROPERTY OWNER INFO
const getPropertyOwnerInfo = asyncHandler(async (req, res) => {
  const { ownerId } = req.params;

  if (!ownerId) {
    throw new ApiError(401, "Owner id not provided");
  }

  const response = await User.findById(ownerId).select(
    "username email phone fullname role avatar"
  );

  if (!response) {
    throw new ApiError(404, "Unable to find owner information");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Owner details fetched successfully"));
});

// UPDATE AVATAR
const updateAvatar = asyncHandler(async (req, res) => {
  const localFilePath = req.file?.path;

  console.log("LOCAL FILE PATH", localFilePath);

  if (!localFilePath) {
    throw new ApiError(404, "Avatar local file path not found!!!");
  }

  const newAvatar = await uploadOnCloudinary(localFilePath);
  const updateNewAvatar = await User.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req?.user?._id),
    {
      avatar: newAvatar.url, // Use $set to ensure the field is created if it doesn't exist
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateNewAvatar, "Avatar updated successfully"));
});

//LIST OF ALL USERS
const getAllUsersData = asyncHandler(async (req, res) => {
  const userList = await User.find();
  console.log(userList);
  return res
    .status(200)
    .json(new ApiResponse(200, userList, "All user data fetched successfully"));
});

// MY LISTINGS
const getMyListings = asyncHandler(async (req, res) => {
  const listings = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "initialforms",
        localField: "_id",
        foreignField: "owner",
        as: "listings", // Replaced space with underscore
        pipeline: [
          {
            $lookup: {
              from: "kyclistings",
              localField: "_id",
              foreignField: "forProperty",
              as: "kycData",
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, listings, "All listings fetched successfully"));
});

// MANAGE USERS
const manageUsers = asyncHandler(async (req, res) => {
  const authUser = req.user;

  const users = await User.find().select("-password -refreshToken");

  if (!users) {
    return res.status(200).json(new ApiResponse(200, users, "No users found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

// ASSIGN PINCODES
const assignNewPincode = asyncHandler(async (req, res) => {
  const { pincodes } = req.body; // Ensure userId and pincodes are passed from the frontend
  const { userId } = req.params;

  // Check if pincodes are provided
  if (!pincodes || pincodes.length === 0) {
    throw new ApiError(400, "Pincode is required");
  }

  // Fetch the user by ID
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if the user has role 1 or 3
  if (user.role !== "1" && user.role !== "3") {
    throw new ApiError(
      403,
      "Only users with role 1 or 3 can be assigned pincodes"
    );
  }

  // Check if any of the provided pincodes are already assigned to another user
  const existingPincodeUsers = await User.find({
    assignedPincodes: { $in: pincodes },
  });

  if (existingPincodeUsers.length > 0) {
    const assignedPincodes = existingPincodeUsers.flatMap(
      (user) => user.assignedPincodes
    );
    const conflictingPincodes = pincodes.filter((pincode) =>
      assignedPincodes.includes(pincode)
    );

    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          conflictingPincodes,
          "One or more pincodes are already assigned to another user"
        )
      );
  }

  // Assign the unique pincodes to the user
  user.assignedPincodes = [...new Set([...user.assignedPincodes, ...pincodes])]; // Ensure pincodes are unique for the user
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Pincodes successfully assigned"));
});

// ASSIGN PINCODES TO BROKER
const assignPincodeToBroker = asyncHandler(async (req, res) => {
  const pincodes = req.body;
  const { userId } = req.params;

  console.log("PINCODES RECEIVED ON BACKEND: ", pincodes);

  if (!pincodes || pincodes.length === 0) {
    throw new ApiError(400, "Pincode is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "Broker") {
    throw new ApiError(
      403,
      "Only users with role Broker can be assigned pincodes through this route"
    );
  }

  const existingPincodeUsers = await User.find({
    assignedPincodes: { $in: pincodes },
    role: "Broker",
  });

  if (existingPincodeUsers.length > 0) {
    const assignedPincodes = existingPincodeUsers.flatMap(
      (user) => user.assignedPincodes
    );
    const conflictingPincodes = pincodes.filter((pincode) =>
      assignedPincodes.includes(pincode)
    );

    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          conflictingPincodes,
          "One or more pincodes are already assigned to another user"
        )
      );
  }

  user.assignedPincodes = [...new Set([...user.assignedPincodes, ...pincodes])];
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Pincodes successfully assigned to Broker")
    );
});

// ASSIGN PINCODES TO LAWYER
const assignPincodeToLawyer = asyncHandler(async (req, res) => {
  const { pincodes } = req.body;
  const { userId } = req.params;
  console.log("PINCODES | Assign Pincode T0 Lawyer: ", pincodes);
  console.log("USER ID | Assign Pincode T0 Lawyer: ", userId);
  if (!pincodes || pincodes.length === 0) {
    throw new ApiError(400, "Pincode is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "Lawyer") {
    throw new ApiError(
      403,
      "Only users with role Lawyer can be assigned pincodes through this route"
    );
  }

  const existingPincodeUsers = await User.find({
    assignedPincodes: { $in: pincodes },
    role: "Lawyer",
  });

  if (existingPincodeUsers.length > 0) {
    const assignedPincodes = existingPincodeUsers.flatMap(
      (user) => user.assignedPincodes
    );
    const conflictingPincodes = pincodes.filter((pincode) =>
      assignedPincodes.includes(pincode)
    );

    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          conflictingPincodes,
          "One or more pincodes are already assigned to another user"
        )
      );
  }

  user.assignedPincodes = [...new Set([...user.assignedPincodes, ...pincodes])];
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Pincodes successfully assigned to Lawyer")
    );
});

// LIST OF ASSIGNED PINCODES
const assignedPincodes = asyncHandler(async (req, res) => {
  // Fetch users with assigned pincodes
  const usersWithPincodes = await User.find({
    assignedPincodes: { $exists: true, $ne: [] },
  }).select("assignedPincodes");

  if (!usersWithPincodes || usersWithPincodes.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No Assigned Pincodes Found"));
  }

  // Extract assigned pincodes from all users
  const allAssignedPincodes = usersWithPincodes.reduce((acc, user) => {
    return acc.concat(user.assignedPincodes);
  }, []);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allAssignedPincodes,
        "All Assigned Pincodes Fetched Successfully"
      )
    );
});

// LIST OF ASSIGNED PINCODES FOR BROKERS
const assignedPincodesForBrokers = asyncHandler(async (req, res) => {
  // Fetch brokers with assigned pincodes
  const brokerPincodes = await User.find({
    role: "Broker",
    assignedPincodes: { $exists: true, $ne: [] },
  }).select("assignedPincodes");

  if (!brokerPincodes || brokerPincodes.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No Assigned Pincodes Found for Brokers"));
  }

  const allBrokerPincodes = brokerPincodes.reduce((acc, user) => {
    return acc.concat(user.assignedPincodes);
  }, []);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allBrokerPincodes,
        "All Assigned Pincodes for Brokers Fetched Successfully"
      )
    );
});

// LIST OF ASSIGNED PINCODES FOR LAWYERS
const assignedPincodesForLawyers = asyncHandler(async (req, res) => {
  // Fetch lawyers with assigned pincodes
  const lawyerPincodes = await User.find({
    role: "Lawyer",
    assignedPincodes: { $exists: true, $ne: [] },
  }).select("assignedPincodes");

  if (!lawyerPincodes || lawyerPincodes.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No Assigned Pincodes Found for Lawyers"));
  }

  const allLawyerPincodes = lawyerPincodes.reduce((acc, user) => {
    return acc.concat(user.assignedPincodes);
  }, []);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allLawyerPincodes,
        "All Assigned Pincodes for Lawyers Fetched Successfully"
      )
    );
});

//List Of Brokers
export const allbrokers = asyncHandler(async (req, res) => {
  const user = await User.find({
    role: "Broker",
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "No brokers found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "All brokers fetched successfully"));
});

//List Of Lawyers
export const alllawyers = asyncHandler(async (req, res) => {
  const user = await User.find({
    role: "Lawyer",
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "No lawyers found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "All lawyers fetched successfully"));
});

//List Of Buyer Seller
export const allbuyerseller = asyncHandler(async (req, res) => {
  const user = await User.find({
    role: "Buyer/Seller",
  });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No buyer/seller found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "All buyer/seller fetched successfully"));
});

//List Of User Client
export const alluserclient = asyncHandler(async (req, res) => {
  const user = await User.find({
    role: "User/Client",
  });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No User/Client found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "All User/Client fetched successfully"));
});

//List Of Admins
export const alladmins = asyncHandler(async (req, res) => {
  const user = await User.find({
    role: "Admin",
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "No admins found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "All Admin fetched successfully"));
});

//List Of All Users
export const allUsers = asyncHandler(async (req, res) => {
  const user = await User.find();

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "No admins found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "All Admin fetched successfully"));
});

export {
  generateAccessAndRefreshToken,
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  updateAvatar,
  currentUserInfo,
  getAllUsersData,
  getMyListings,
  refreshAccessToken,
  getPropertyOwnerInfo,
  manageUsers,
  assignNewPincode,
  assignedPincodes,
  assignedPincodesForLawyers,
  assignedPincodesForBrokers,
  assignPincodeToBroker,
  assignPincodeToLawyer,
  checkAuth,
};
