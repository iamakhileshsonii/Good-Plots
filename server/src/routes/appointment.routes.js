import { Router } from "express";
import {
  acceptAppointments,
  confirmedAppointments,
  rejectAppointments,
  requestedAppointments,
  sentAppointments,
} from "../controllers/appointment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/requested-appointments").get(verifyJWT, requestedAppointments);
router.route("/sent-appointments").get(verifyJWT, sentAppointments);
router.route("/confirmed-appointments").get(verifyJWT, confirmedAppointments);
router.route("/reject-appointment/:appointmentId").post(rejectAppointments);
router.route("/accept-appointment/:appointmentId").post(acceptAppointments);

export default router;
