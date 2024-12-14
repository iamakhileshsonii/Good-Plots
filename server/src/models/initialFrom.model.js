import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const initialFormSchema = new mongoose.Schema(
  {
    saleType: {
      type: String,
    },
    title: {
      type: String,
    },
    propertySubtype: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      addressLine: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },
    totalArea: {
      type: Number,
    },
    expectedPrice: {
      type: Number,
    },
    isNegotiable: {
      type: Boolean,
    },
    kyc: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

initialFormSchema.plugin(mongooseAggregatePaginate);

export const InitialForm = mongoose.model("InitialForm", initialFormSchema);
