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
      expectedByBuyer_totalPaymentAmount: { type: Number },
      expectedByBuyer_totalTime: { type: Number },
      expectedByBuyer_earnestMoney: { type: Number },
      expectedBySeller_totalPaymentAmount: { type: Number },
      expectedBySeller_totalTime: { type: Number },
      expectedBySeller_earnestMoney: { type: Number },
      dateOfPayment: { type: Date },
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
