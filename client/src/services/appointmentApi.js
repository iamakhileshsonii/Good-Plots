import { useToast } from "@/hooks/use-toast";
import { apiClient } from "./apiClient";

// All Confirmed Appointments
export const confirmedAppointments = async () => {
  try {
    const res = await apiClient.get("/appointment/all-confirmed");

    if (res.status === 200) {
      return res.data.data;
    } else {
      console.log("Error fetching all confirmed appointments");
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while fetching confirmed appointments");
  }
};

// All Requested By Me Appointments
export const requestedByMeAppointments = async () => {
  try {
    const res = await apiClient.get("/appointment/all-requested-by-me");

    if (res.status === 200) {
      console.log("All  requested by me  Appointments", res.data);
      return res.data.data;
    } else {
      console.log("Error fetching all  requested by me  appointments");
      return null;
    }
  } catch (error) {
    console.error(
      "Something went wrong while fetching requested by me appointments"
    );
  }
};

// All Awaiting My Approval Appointments
export const awaitingMyApprovalAppointments = async () => {
  try {
    const res = await apiClient.get("/appointment/all-awaiting-my-approval");

    if (res.status === 200) {
      return res.data.data;
    } else {
      console.log("Error fetching all awaiting my approval appointments");
      return null;
    }
  } catch (error) {
    console.error(
      "Something went wrong while fetching awaiting my approval appointments"
    );
    return null;
  }
};

// Schedule Appointment
export const scheduleAppointment = async (formData) => {
  try {
    const res = await apiClient.post("/appointment/schedule", { formData });
    return res; // Success (2xx responses)
  } catch (error) {
    // Axios throws an error for non-2xx responses
    if (error.response) {
      console.error("Error Response:", error.response);
      throw error.response; // Throw the actual response for error-specific handling
    }
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred");
  }
};

//Re-Schedule Appointment
export const reScheduleAppointment = async (appointmentId, formData) => {
  try {
    const res = await apiClient.post(
      `/appointment/re-schedule/${appointmentId}`,
      { formData }
    );

    if (res.status === 200) {
      console.log("Appointment Re Shceduled", res.data);
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while re-scheduling the appointment.");
  }
};

//Cancel Appointment
export const cancelAppointment = async (appointmentId) => {
  try {
    const res = await apiClient.post(`/appointment/cancel/${appointmentId}`);

    if (res.status === 200) {
      console.log("Appointment cancelled", res.data);
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while cancelling the appointment");
  }
};

//Accept Appointment
export const acceptAppointment = async (appointmentId) => {
  try {
    const res = await apiClient.post(`/appointment/accept/${appointmentId}`);

    if (res.status === 200) {
      console.log("Appointment Accepted", res.data);
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while accepting the appointment");
  }
};
