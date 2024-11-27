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

export {
  getCurrentPropertyData,
  getProperty,
  getAllVerifiedProperties,
  getAllPendingProperties,
  getFilteredProperty,
};
