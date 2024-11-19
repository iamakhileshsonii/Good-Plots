import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const initialFormSchema = new mongoose.Schema(
  {
    saleType: {
      type: String,
      required: [true, "Sale type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is"],
    },
    propertySubtype: {
      type: String,
      required: [true, "Property subtype is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    address: {
      addressLine: {
        type: String,
        required: [true, "Address line is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
    },
    totalArea: {
      type: String,
      required: [true, "Total area is required"],
    },
    expectedPrice: {
      type: Number,
      required: [true, "Expected price is required"],
    },
    isNegotiable: {
      type: String,
      required: [true, "Is negotiable is required"],
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
