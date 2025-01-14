import mongoose from "mongoose";
import { ScheduleAppointment } from "../models/scheduleAppointment.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isValid, parse } from "date-fns";

//SENT APPOINTMENTS
const sentAppointments = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // or req.user?._id depending on your user schema

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

// ______________ NEW CONTROLLERS

//Confirmed Appointments
export const allConfirmedAppointments = asyncHandler(async (req, res) => {
  const appointments = await ScheduleAppointment.aggregate([
    {
      $match: {
        status: "ACCEPTED",
        $or: [
          { appointmentBy: new mongoose.Types.ObjectId(req.user._id) },
          { appointmentWith: new mongoose.Types.ObjectId(req.user._id) },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "appointmentWith",
        foreignField: "_id",
        as: "appointmentWithUser",
      },
    },
    {
      $unwind: "$appointmentWithUser",
    },
    {
      $lookup: {
        from: "initialforms",
        localField: "appointmentFor",
        foreignField: "_id",
        as: "appointmentForProperty",
        pipeline: [
          {
            $lookup: {
              from: "propertykycs",
              localField: "_id",
              foreignField: "propertyId",
              as: "details",
            },
          },
        ],
      },
    },
    {
      $unwind: "$appointmentForProperty",
    },
    {
      $lookup: {
        from: "users",
        localField: "appointmentBy",
        foreignField: "_id",
        as: "appointmentByUser",
      },
    },
    {
      $project: {
        _id: 1,
        appointmentDate: 1,
        appointmentTime: 1,
        appointmentWithUser: 1,
        appointmentForProperty: 1,
        appointmentByUser: 1,
      },
    },
  ]);

  if (!appointments) {
    throw new ApiError(404, "No confirmed appointments found");
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
});

//Requested By Me
export const allRequestedByMeAppointments = asyncHandler(async (req, res) => {
  const appointments = await ScheduleAppointment.aggregate([
    {
      $match: {
        appointmentBy: new mongoose.Types.ObjectId(req.user._id),
        $or: [{ status: "PENDING" }, { status: "ACCEPTED" }],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "appointmentWith",
        foreignField: "_id",
        as: "appointmentWithUser",
      },
    },
    {
      $unwind: "$appointmentWithUser",
    },
    {
      $lookup: {
        from: "initialforms",
        localField: "appointmentFor",
        foreignField: "_id",
        as: "appointmentForProperty",
        pipeline: [
          {
            $lookup: {
              from: "propertykycs",
              localField: "_id",
              foreignField: "propertyId",
              as: "details",
            },
          },
        ],
      },
    },
    {
      $unwind: "$appointmentForProperty",
    },
    {
      $lookup: {
        from: "users",
        localField: "appointmentBy",
        foreignField: "_id",
        as: "appointmentByUser",
      },
    },
    {
      $project: {
        _id: 1,
        appointmentDate: 1,
        appointmentTime: 1,
        appointmentWithUser: 1,
        appointmentForProperty: 1,
        appointmentByUser: 1,
      },
    },
  ]);

  if (!appointments) {
    throw new ApiError(404, "No requested by me appointments found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "All requested by me appointments fetched successfully"
      )
    );
});

//Awaiting My Approval
export const allAwaitingMyApprovalAppointments = asyncHandler(
  async (req, res) => {
    const appointments = await ScheduleAppointment.aggregate([
      {
        $match: {
          appointmentWith: new mongoose.Types.ObjectId(req.user._id),
          status: "PENDING",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "appointmentWith",
          foreignField: "_id",
          as: "appointmentWithUser",
        },
      },
      {
        $unwind: "$appointmentWithUser",
      },
      {
        $lookup: {
          from: "initialforms",
          localField: "appointmentFor",
          foreignField: "_id",
          as: "appointmentForProperty",
          pipeline: [
            {
              $lookup: {
                from: "propertykycs",
                localField: "_id",
                foreignField: "propertyId",
                as: "details",
              },
            },
          ],
        },
      },
      {
        $unwind: "$appointmentForProperty",
      },
      {
        $lookup: {
          from: "users",
          localField: "appointmentBy",
          foreignField: "_id",
          as: "appointmentByUser",
        },
      },
      {
        $project: {
          _id: 1,
          appointmentDate: 1,
          appointmentTime: 1,
          appointmentWithUser: 1,
          appointmentForProperty: 1,
          appointmentByUser: 1,
        },
      },
    ]);

    if (!appointments) {
      throw new ApiError(404, "No awaiting my approval appointments found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          appointments,
          "All awaiting my approval appointments fetched successfully"
        )
      );
  }
);

// Schedule an appointment
export const scheduleAppointment = asyncHandler(async (req, res) => {
  const { formData } = req.body;
  console.log("APPOINTMENT REQUEST FOR: ", formData);

  if (!formData) {
    throw new ApiError(400, "All fields are required");
  }

  // Parse the date using date-fns (Fix format `yyyy-MM-dd` instead of `yyyy-mm-dd`)
  const parsedDate = parse(formData.appointmentDate, "yyyy-MM-dd", new Date());

  // Validate parsed date
  if (!isValid(parsedDate)) {
    throw new ApiError(400, "Invalid appointment date");
  }

  // Check if the appointment already exists for this property
  const isAppointmentExists = await ScheduleAppointment.findOne({
    appointmentFor: formData.appointmentFor,
    $or: [
      {
        appointmentBy: req.user._id,
        appointmentWith: formData.appointmentWith,
      },
      {
        appointmentWith: req.user._id,
        appointmentBy: formData.appointmentWith,
      },
    ],
    $or: [
      {
        status: "ACCEPTED",
      },
      {
        status: "PENDING",
      },
    ],
  });

  // If appointment exists, return 409 Conflict
  if (isAppointmentExists) {
    console.log("Appointment Exists!!!!!");
    return res
      .status(409)
      .json(
        new ApiResponse(
          409,
          isAppointmentExists,
          "Appointment already exists for this property"
        )
      );
  }

  // Create a new appointment
  const newAppointment = await ScheduleAppointment.create({
    appointmentFor: formData.appointmentFor,
    appointmentWith: formData.appointmentWith,
    appointmentDate: parsedDate, // Store the parsed date
    appointmentBy: req.user._id,
    appointmentTime: formData.appointmentTime,
  });

  if (!newAppointment) {
    throw new ApiError(500, "Failed to schedule appointment");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newAppointment },
        "Appointment scheduled successfully"
      )
    );
});

//Re-Schedule appointment
export const reScheduleAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { formData } = req.body;

  console.log("FORMDATA: ", formData);

  // Parse the date using date-fns (Fix format `yyyy-MM-dd` instead of `yyyy-mm-dd`)
  const parsedDate = parse(formData.appointmentDate, "yyyy-MM-dd", new Date());

  console.log("Parsed Date", parsedDate);

  if (!appointmentId) {
    throw new ApiError(400, "Appoinment Id is required");
  }

  const newAppointment = await ScheduleAppointment.findByIdAndUpdate(
    appointmentId,

    {
      appointmentDate: parsedDate,
      appointmentTime: formData.appointmentTime,
    },
    {
      new: true,
    }
  );

  if (!newAppointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newAppointment,
        "Appointment Re-Scheduled successfully"
      )
    );
});

//Cancel appointment
export const cancelAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    throw new ApiError(400, "Appointment Id is required");
  }

  const cancelApmt = await ScheduleAppointment.findByIdAndUpdate(
    appointmentId,
    {
      status: "REJECTED",
    },
    { new: true }
  );

  if (!cancelApmt) {
    throw new ApiError(500, "Unable to cancel the appointment");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, cancelApmt, "Appointment cancelled successfully")
    );
});

//Accept appointment
export const acceptAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    throw new ApiError(400, "Appointment Id is required");
  }

  const acceptApmt = await ScheduleAppointment.findByIdAndUpdate(
    appointmentId,
    {
      status: "ACCEPTED",
    },
    { new: true }
  );

  if (!acceptApmt) {
    throw new ApiError(500, "Unable to accept the appointment");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, acceptApmt, "Appointment accepted successfully")
    );
});
