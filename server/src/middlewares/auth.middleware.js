import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request (or) token is invalid");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log("decodedToken", decodedToken);

    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("ERROR WITH JWT", error);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
