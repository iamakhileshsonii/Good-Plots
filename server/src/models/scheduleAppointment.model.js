import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const scheduleAppointmentSchema = new mongoose.Schema(
  {
    appointmentBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    appointmentWith: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    appointmentFor: {
      type: mongoose.Types.ObjectId,
      ref: "InitialForm",
    },
    appointmentDate: {
      type: Date,
    },
    appointmentTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

scheduleAppointmentSchema.plugin(mongooseAggregatePaginate);

export const ScheduleAppointment = mongoose.model(
  "ScheduleAppointment",
  scheduleAppointmentSchema
);
