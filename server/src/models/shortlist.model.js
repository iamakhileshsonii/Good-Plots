import mongoose from "mongoose";

const shortlistSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Types.ObjectId,
      ref: "InitialForm",
    },
    shortlistedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Shortlist = mongoose.model("Shortlist", shortlistSchema);
