import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { InitialForm } from "../models/initialFrom.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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

const getProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  console.log("PROPERTY ID FETCHED: ", propertyId);

  const property = await InitialForm.findById({
    _id: propertyId,
  });

  if (!property) {
    return res.status(200).json(new ApiResponse(200, {}, "No property found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, property, "Property data fetched successfully"));
});

const getAllVerifiedProperties = asyncHandler(async (req, res) => {
  const properties = await InitialForm.find({
    kyc: "completed",
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

export {
  getCurrentPropertyData,
  getProperty,
  getAllVerifiedProperties,
  getAllPendingProperties,
};
