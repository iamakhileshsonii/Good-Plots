import mongoose, { mongo } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { InitialForm } from "../models/initialFrom.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import { PropertyKyc } from "../models/propertyKyc.model.js";
import { Shortlist } from "../models/shortlist.model.js";
import { Like } from "../models/like.model.js";

const getCurrentPropertyData = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  console.log(`PROPERTY ID: `, propertyId);

  const data = await InitialForm.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(propertyId),
      },
    },
    {
      $lookup: {
        from: "kyclistings",
        localField: "_id",
        foreignField: "forProperty",
        as: "propertyData",
      },
    },
    {
      $unwind: {
        path: "$propertyData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerData",
      },
    },
    {
      $unwind: {
        path: "$ownerData",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  console.log(`FETCHED RESPONSE: ${JSON.stringify(data)}`);

  if (!data || data.length === 0) {
    throw new ApiError(404, "No data found for the current property");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, data, "Current property data fetched successfully")
    );
});

// ---------------------NEW CONTROLLERS -------------------

//Get Property
const getProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.propertyId;

  console.log("PROPERTY IDL : ", propertyId);

  const propertyData = await InitialForm.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(propertyId),
      },
    },
    {
      $lookup: {
        from: "propertykycs",
        localField: "_id",
        foreignField: "propertyId",
        as: "kycDetails",
      },
    },
  ]);

  if (!res) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Property data not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, propertyData, "Property data fetched successfully")
    );
});

//Submit A New Property
const submitNewProperty = asyncHandler(async (req, res) => {
  const { formData } = req.body;

  console.log("Initial Form Submitted: ", formData);

  if (!formData) {
    throw new ApiError(400, "All fields are required");
  }

  const property = await InitialForm.create({
    ...formData,
    owner: new mongoose.Types.ObjectId(req.user._id),
  });

  if (!property) {
    throw new ApiError(409, "Unable to submit new property");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, property, "New property submitted success fully")
    );
});

//Get All Verified Properties
const getAllVerifiedProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await InitialForm.aggregate([
      {
        $match: {
          kyc: "completed",
        },
      },
      {
        $lookup: {
          from: "propertykycs",
          localField: "_id",
          foreignField: "propertyId",
          as: "details",
        },
      },
    ]);

    if (!properties) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "No properties found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, properties, "Properties Fetched Successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Unable to fetch verified properties", error);
  }
});

//Get All Pending Properties
const getAllPendingProperties = asyncHandler(async (req, res) => {
  const properties = await InitialForm.find({
    kyc: "pending",
  });

  if (!properties) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No properties found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, properties, "Properties Fetched Successfully"));
});

//Get My Pending Properties
export const getUserPendingProperties = asyncHandler(async (req, res) => {
  const properties = await InitialForm.find({
    owner: new mongoose.Types.ObjectId(req.user._id),
    kyc: "pending",
  });

  if (!properties) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No pending properties Found"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        properties,
        "All pending properties fetched successfully"
      )
    );
});

//Get user verified properties
export const getUserVerifiedProperties = asyncHandler(async (req, res) => {
  const properties = await InitialForm.aggregate([
    {
      $match: {
        kyc: "completed",
        owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "propertykycs",
        localField: "_id",
        foreignField: "propertyId",
        as: "details",
      },
    },
  ]);

  if (!properties) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No veridfied properties found"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        properties,
        "All verified properties fetched successfully"
      )
    );
});

//Filter Property
const getFilteredProperty = asyncHandler(async (req, res) => {
  const {
    facing,
    propertySubtype,
    reservedParking,
    coveredParking,
    openParking,
    whetherInCooperativeSociety,
    whetherInGatedComplex,
    isThisCornerHouse,
    saleType,
  } = req.query;

  console.log("REQ QUERY STRING: ", req.query);

  try {
    const matchConditions = {};

    // Add filters to the match condition dynamically
    if (facing) matchConditions["kycDetails.area.facing"] = facing;
    if (propertySubtype) matchConditions["propertySubtype"] = propertySubtype;
    if (reservedParking)
      matchConditions["kycDetails.reservedParking"] = reservedParking;
    if (coveredParking)
      matchConditions["kycDetails.coveredParking"] = coveredParking;
    if (openParking) matchConditions["kycDetails.openParking"] = openParking;
    if (whetherInCooperativeSociety)
      matchConditions["kycDetails.whetherInCooperativeSociety"] =
        whetherInCooperativeSociety;
    if (whetherInGatedComplex)
      matchConditions["kycDetails.whetherInGatedComplex"] =
        whetherInGatedComplex;
    if (isThisCornerHouse)
      matchConditions["kycDetails.isThisCornerHouse"] = isThisCornerHouse;
    if (saleType) matchConditions["saleType"] = saleType;

    const properties = await InitialForm.aggregate([
      {
        $match: {
          kyc: "completed",
        },
      },
      {
        $lookup: {
          from: "kyclistings", // MongoDB collection for kycListing
          localField: "_id",
          foreignField: "forProperty",
          as: "kycDetails",
        },
      },
      {
        $unwind: {
          path: "$kycDetails",
          preserveNullAndEmptyArrays: true, // In case some properties don't have KYC details
        },
      },
      {
        $match: matchConditions, // Apply dynamic filters
      },
    ]);

    res.status(200).json({ data: properties });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Upload Kyc Property Images
const propertyKycImages = asyncHandler(async (req, res) => {
  const uploadedImages = {};

  for (const [key, value] of Object.entries(req.files)) {
    for (const file of value) {
      const { fieldname, path } = file;
      console.log(`Field Name: ${fieldname} || Path: ${path}`);
      if (path) {
        // Upload to Cloudinary
        const upload = await uploadOnCloudinary(path);
        if (!upload.url) {
          throw new ApiError(401, "Unable to upload image to Cloudinary");
        }
        console.log("IMAGE UPLOADED TO CLOUDINARY", upload.url);

        // Save only the first URL for each fieldname
        if (!uploadedImages[fieldname]) {
          uploadedImages[fieldname] = upload.url; // Store as string
        }
      }
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        uploadedImages,
        "All property KYC images uploaded successfully"
      )
    );
});

//Save Property KYC
const savePropertyKyc = async (req, res) => {
  try {
    const { propertyId } = req.params; // Extract propertyId from the request parameters
    const formData = req.body; // Get the form data from the request body
    console.log("REQ BODY RECEIVED: ", formData);

    // Check if formData exists
    if (!formData) {
      return res.status(400).json({ message: "Form data is required" });
    }

    // Validate the propertyId exists in the InitialForm collection
    const property = await InitialForm.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Prepare the data to be saved into PropertyKyc
    const propertyKycData = {
      propertyId: property._id, // Reference to the InitialForm's _id
      propertySubtype: formData.propertySubtype,
      area: formData.area, // Ensure area is correctly structured
      willingToRentOutTo: formData.willingToRentOutTo,
      totalFlatsInSociety: formData.totalFlatsInSociety,
      nameOfProjectSociety: formData.nameOfProjectSociety,
      availableFrom: formData.availableFrom,
      bedrooms: formData.bedrooms,
      maxSleepingCapacity: formData.maxSleepingCapacity,
      isPrivateOrGroupAllowed: formData.isPrivateOrGroupAllowed,
      maxPrivateOrGroupAllowed: formData.maxPrivateOrGroupAllowed,
      balconies: formData.balconies,
      bathrooms: formData.bathrooms,
      totalFloors: formData.totalFloors,
      propertyOnFloor: formData.propertyOnFloor,
      otherRooms: formData.otherRooms,
      furnishedStatus: formData.furnishedStatus,
      ifFurnishedOrSemiFurnished: formData.ifFurnishedOrSemiFurnished, // Handle as an object if it's complex
      reservedParking: formData.reservedParking,
      coveredParking: formData.coveredParking,
      openParking: formData.openParking,
      whetherInCooperativeSociety: formData.whetherInCooperativeSociety,
      whetherInGatedComplex: formData.whetherInGatedComplex,
      isThisCornerHouse: formData.isThisCornerHouse,
      amenities: formData.amenities, // Check if this needs to be an object or string
      proximity: formData.proximityDetails, // Ensure proximity is structured correctly
      propertyHasFireSafetyLicense: formData.propertyHasFireSafetyLicense,
      ageOfTheProperty: formData.ageOfTheProperty,
      forFeiture: formData.forFeiture,
      priceDetails: formData.priceDetails, // Handle as an object
      photos: formData.propertyImages, // Handle photos as an object (assuming object of URLs)
    };

    // Create the PropertyKyc instance
    const propertyKyc = new PropertyKyc(propertyKycData);

    // Save the new PropertyKyc document
    await propertyKyc.save();

    //Update kyc status of initial form
    // Update kyc status of the InitialForm
    const updatedForm = await InitialForm.findByIdAndUpdate(
      propertyId,
      { kyc: "completed" }, // Update the kyc status to "completed"
      { new: true } // Return the updated document
    );

    // Return success response
    return res.status(201).json({
      message: "Property KYC saved successfully",
      data: propertyKyc,
    });
  } catch (error) {
    console.error("Error saving Property KYC:", error);
    return res.status(500).json({
      message: "Server error while saving Property KYC",
      error: error.message,
    });
  }
};

// Explore Properties
const exploreProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await InitialForm.aggregate([
      {
        $match: {
          owner: { $ne: new mongoose.Types.ObjectId(req.user._id) }, // Exclude current user
          kyc: "completed",
        },
      },
      {
        $lookup: {
          from: "propertykycs", // The name of the collection for KYC details
          localField: "_id", // Field in InitialForm to match
          foreignField: "propertyId", // Field in propertykycs to match
          as: "kycDetails", // Alias for the joined data
        },
      },
    ]);

    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "No properties found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, properties, "Properties fetched successfully")
      );
  } catch (error) {
    console.error(
      "Something went wrong while fetching properties to explore",
      error
    );
    throw new ApiError(
      500,
      "Something went wrong while fetching properties to explore"
    );
  }
});

//Delete Property
const deleteProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  try {
    if (!propertyId) {
      throw new ApiError(400, "Property Id is required");
    }

    const deletePropertyKyc = await PropertyKyc.deleteOne({
      propertyId: propertyId,
    });

    if (deletePropertyKyc) {
      const deletedProperty = await InitialForm.deleteOne({ _id: propertyId });

      if (!deletedProperty) {
        throw new ApiError(409, "Unable to delete selected property");
      }
    } else {
      return res
        .status(404)
        .json(
          new ApiResponse(404, {}, "Property with select property Id not found")
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Property deleted successfully"));
  } catch (error) {
    console.error("Something went wrong while deleting property", error);
    throw new ApiError(500, "unable to delete property");
  }
});

//Shortlisted Properties
const getShortlistedProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await Shortlist.find({
      shortlistedBy: new mongoose.Types.ObjectId(req.user._id),
    });

    if (!properties) {
      return res.status(404).json(404, {}, "No shortlisted property found");
    }

    return res
      .status(200)
      .json(200, properties, "All Shortlisted properties fetched successfully");
  } catch (error) {
    console.error("Unable to fetch shortlisted properties", error);
  }
});

//Liked Properties
const getLikedProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await Like.find({
      likedBy: new mongoose.Types.ObjectId(req.user._id),
    });

    if (!properties) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "No Liked property found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          properties,
          "All liked properties fetched successfully"
        )
      );
  } catch (error) {
    console.error("Unable to fetch liked properties", error);
  }
});

export {
  getCurrentPropertyData,
  getProperty,
  getAllVerifiedProperties,
  getAllPendingProperties,
  getFilteredProperty,
  savePropertyKyc,
  propertyKycImages,
  exploreProperties,
  deleteProperty,
  getShortlistedProperties,
  getLikedProperties,
  submitNewProperty,
};
