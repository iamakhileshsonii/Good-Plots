import mongoose from "mongoose";

const saleNotationSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InitialForm",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SaleNotationMessage",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "countered"],
      default: "pending",
    },
    lastActionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const SaleNotation = mongoose.model("SaleNotation", saleNotationSchema);
