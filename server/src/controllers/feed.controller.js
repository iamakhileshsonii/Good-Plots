import mongoose from "mongoose";
import { InitialForm } from "../models/initialFrom.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { ScheduleAppointment } from "../models/scheduleAppointment.model.js";

//EXPLORE FEED
const exploreFeed = asyncHandler(async (req, res) => {
  // Ensure the user ID is available in the request object
  const userId = req.user?._id;
  console.log("LOGGED USER ID: ", userId);

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  try {
    // Perform the aggregation to find feeds where the owner is not the logged-in user
    const data = await InitialForm.aggregate([
      {
        $match: {
          owner: { $ne: new mongoose.Types.ObjectId(userId) },
          kyc: "completed",
        },
      },
      {
        $lookup: {
          from: "kyclistings", // Ensure this is the exact name of the collection
          localField: "_id",
          foreignField: "forProperty",
          as: "propertyDetails",
        },
      },
    ]);

    // Check if data is found
    if (!data || data.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, "No property data found"));
    }

    // Return the fetched data as a response
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Feeds fetched successfully"));
  } catch (error) {
    // Handle any errors that occur during the aggregation
    console.error("Error fetching feeds:", error);
    throw new ApiError(500, "Internal Server Error");
  }
});

// LIKE FEED
const likeFeed = asyncHandler(async (req, res) => {
  const { feedId } = req.params;
  const userId = req?.user?._id; // Assuming you have user authentication and user ID is available in req.user

  if (!feedId) {
    throw new ApiError(401, "FeedId not received");
  }

  // Check if the feed (listing) exists
  const listing = await InitialForm.findById(feedId);
  if (!listing) {
    throw new ApiError(404, "Feed not found");
  }

  // Check if the user has already liked this feed
  const existingLike = await Like.findOne({
    listingId: feedId,
    likedBy: userId,
  });

  if (existingLike) {
    // If a like exists, remove it (dislike)
    await Like.deleteOne({ _id: existingLike._id });
    const likeCount = await Like.countDocuments({ listingId: feedId });
    res.status(200).json({
      message: "Feed unliked successfully",
      likeCount,
    });
  } else {
    // If no like exists, create a new like
    const like = new Like({
      listingId: feedId,
      likedBy: userId,
    });
    await like.save();
    const likeCount = await Like.countDocuments({ listingId: feedId });
    res.status(201).json({
      message: "Feed liked successfully",
      likeCount,
    });
  }
});

// LIKED FEEDS
const likedFeeds = asyncHandler(async (req, res) => {
  const userId = req?.user?._id; // Assuming you have user authentication and user ID
  console.log("LIKE FEED STATUS FEED ID: ", userId);
  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const likedData = await Like.find({
    likedBy: new mongoose.Types.ObjectId(userId),
  });

  if (!likedData) {
    res.status(200).json(new ApiResponse(200, {}, "No liked feeds"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, likedData, "Liked feeds fetched successfully"));
});

// LIKE STATUS
const likeStatus = asyncHandler(async (req, res) => {
  const { feedId } = req.params;
  const userId = req?.user?._id; // Assuming you have user authentication and user ID

  if (!feedId) {
    throw new ApiError(401, "FeedId not received");
  }

  if (!userId) {
    throw new ApiError(401, "UserId not received");
  }

  // Check if the user has already liked this feed
  const likeData = await Like.findOne({ listingId: feedId, likedBy: userId });

  if (!likeData) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isLiked: false },
          "You have not liked the listing"
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { isLiked: true }, "You have liked the listing")
    );
});

//SCHEDULE MEETING
const ScheduleFeedAppointment = asyncHandler(async (req, res) => {
  const { appointmentBy, appointmentWith, appointmentFor, appointmentDate } =
    req.body;

  console.log("Request Body:", req.body);

  // Uncomment these checks for better error handling
  if (!appointmentBy) {
    throw new ApiError(401, "Client Id is required");
  }
  if (!appointmentWith) {
    throw new ApiError(401, "Property Owner Id is required");
  }
  if (!appointmentFor) {
    throw new ApiError(401, "Property Id is required");
  }
  if (!appointmentDate) {
    throw new ApiError(401, "Appointment date is required");
  }

  const appointment = await ScheduleAppointment.create({
    appointmentBy: appointmentBy,
    appointmentWith: appointmentWith,
    appointmentFor: appointmentFor,
    appointmentDate: appointmentDate,
  });

  if (!appointment) {
    throw new ApiError(401, "Appointment could not be scheduled");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointment, "Appointment scheduled successfully")
    );
});

export {
  exploreFeed,
  likeFeed,
  likeStatus,
  ScheduleFeedAppointment,
  likedFeeds,
};
