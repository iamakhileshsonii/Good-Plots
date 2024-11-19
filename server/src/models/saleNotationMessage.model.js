import mongoose from "mongoose";

const saleNotationMessageSchema = new mongoose.Schema(
  {
    saleNotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleNotation",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: Number,
      enum: [0, 1], // 0 => User   &   1=> System
      default: 0,
    },
    systemMessage: {
      type: String,
    },
    offerDetails: {
      totalPaymentAmount: { type: Number },
      totalTime: { type: String },
      earnestMoney: { type: Number },
      dateOfPayment: { type: Date },
      expectedBySeller: {
        totalPaymentAmount: { type: Number },
        totalTime: { type: String },
        earnestMoney: { type: Number },
      },
      additionalTerms: { type: String },
    },
    agreementDate: {
      type: Date,
    },
    agreementDoc: {
      token: {
        type: String,
      },
      earnestMoney: {
        type: String,
      },
      saleDeed: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const SaleNotationMessage = mongoose.model(
  "SaleNotationMessage",
  saleNotationMessageSchema
);
