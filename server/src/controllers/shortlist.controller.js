import mongoose from "mongoose";
import { Shortlist } from "../models/shortlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// SHORTLIST A FEED
const shortlistFeed = asyncHandler(async (req, res) => {
  const { feedId } = req.params;

  console.log("Feed ID:", feedId); // Debugging
  console.log("User ID:", req.user?._id); // Debugging

  if (!feedId) {
    throw new ApiError(401, "FeedId could not be found");
  }

  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "User ID could not be found");
  }

  // Check if feed already shortlisted
  const verifyShortlistedFeed = await Shortlist.findOne({
    listingId: new mongoose.Types.ObjectId(feedId),
    shortlistedBy: new mongoose.Types.ObjectId(userId),
  });

  if (verifyShortlistedFeed) {
    const rejectShortlistedFeed = await Shortlist.deleteOne({
      listingId: new mongoose.Types.ObjectId(feedId),
      shortlistedBy: new mongoose.Types.ObjectId(userId),
    });

    if (rejectShortlistedFeed.deletedCount === 0) {
      throw new ApiError(401, "Feed could not be rejected");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          verifyShortlistedFeed,
          "Feed rejected successfully"
        )
      );
  }

  const shortlistTheFeed = await Shortlist.create({
    listingId: new mongoose.Types.ObjectId(feedId),
    shortlistedBy: new mongoose.Types.ObjectId(userId),
  });

  if (!shortlistTheFeed) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No shortlisted feeds found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, shortlistTheFeed, "Feed shortlisted successfully")
    );
});

// SHORTLISTED FEEDS
const shortlistedFeeds = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "User ID could not be found");
  }

  const feeds = await Shortlist.aggregate([
    {
      $match: {
        shortlistedBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "initialforms",
        localField: "listingId",
        foreignField: "_id",
        as: "feed",
      },
    },
  ]);

  // Check if feeds is empty
  if (feeds.length === 0) {
    return res
      .status(204)
      .json(new ApiResponse(204, {}, "No shortlisted feeds"));
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(200, feeds, "Shortlisted feeds fetched successfully")
      );
  }
});

export { shortlistFeed, shortlistedFeeds };
