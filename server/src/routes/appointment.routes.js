import { Router } from "express";
import {
  acceptAppointment,
  allAwaitingMyApprovalAppointments,
  allConfirmedAppointments,
  allRequestedByMeAppointments,
  cancelAppointment,
  reScheduleAppointment,
  scheduleAppointment,
} from "../controllers/appointment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/all-confirmed").get(verifyJWT, allConfirmedAppointments);
router
  .route("/all-requested-by-me")
  .get(verifyJWT, allRequestedByMeAppointments);
router
  .route("/all-awaiting-my-approval")
  .get(verifyJWT, allAwaitingMyApprovalAppointments);
router.route("/schedule").post(verifyJWT, scheduleAppointment);
router
  .route("/re-schedule/:appointmentId")
  .post(verifyJWT, reScheduleAppointment);
router.route("/cancel/:appointmentId").post(verifyJWT, cancelAppointment);
router.route("/accept/:appointmentId").post(verifyJWT, acceptAppointment);

export default router;
