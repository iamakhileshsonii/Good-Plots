import mongoose from "mongoose";
import { ScheduleAppointment } from "../models/scheduleAppointment.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

//SENT APPOINTMENTS
const sentAppointments = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // or req.user?._id depending on your user schema
  console.log("REQ USER FOR APPOINTMENT", req.user);
  if (!userId) {
    throw new ApiError(401, "User Id is required");
  }

  const appointments = await ScheduleAppointment.find({
    appointmentBy: userId,
    isAccepted: false,
  });

  if (!appointments) {
    throw new ApiError(404, "No appointments found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "All appointments fetched successfully"
      )
    );
});

//CONFIRMED APPOINTMENTS
const confirmedAppointments = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  console.log("CONFIRMED APPOINTMENTS");

  if (!userId) {
    throw new ApiError(401, "User Id is required");
  }

  try {
    const appointments = await ScheduleAppointment.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [{ appointmentBy: userId }, { appointmentWith: userId }],
            },
            { isAccepted: true }, // Ensure this matches the actual type in your DB
          ],
        },
      },
    ]);

    console.log("Fetched Appointments:", appointments);

    if (appointments.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No confirmed appointments found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          appointments,
          "All confirmed appointments fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new ApiError(500, "An error occurred while fetching appointments");
  }
});

//REQUESTED APPOINTMENTS
const requestedAppointments = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // or req.user?._id depending on your user schema

  if (!userId) {
    throw new ApiError(401, "User Id is required");
  }

  const appointments = await ScheduleAppointment.aggregate([
    {
      $match: {
        appointmentWith: userId,
        isAccepted: false,
      },
    },
  ]);

  if (!appointments) {
    throw new ApiError(404, "No appointments found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "All requested appointments fetched successfully"
      )
    );
});

//REJECT APPOINTMENT
const rejectAppointments = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    throw new ApiError(401, "Appointment could not be found");
  }

  const deleteAppointment = await ScheduleAppointment.deleteOne({
    _id: appointmentId,
  });

  if (!deleteAppointment) {
    throw new ApiError(409, "Unable to delete appointment record");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Appointment rejected successfully"));
});

//ACCEPT APPOINTMENT
const acceptAppointments = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    throw new ApiError(401, "Appointment could not be found");
  }

  const appointmentData = await ScheduleAppointment.findByIdAndUpdate(
    new mongoose.Types.ObjectId(appointmentId), // The ID of the appointment to be updated
    { isAccepted: true }, // The update to be applied
    { new: true } // Options, here it returns the updated document
  );

  if (!appointmentData) {
    throw new ApiError(401, "Unable to accept appointment");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointmentData, "Appointment accepted successfully")
    );
});

export {
  sentAppointments,
  requestedAppointments,
  rejectAppointments,
  confirmedAppointments,
  acceptAppointments,
};
