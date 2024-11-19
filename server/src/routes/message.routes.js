import { Router } from "express";
import {
  getMessages,
  getUserConversations,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:receiverId").get(verifyJWT, getMessages);
router.route("/send-message/:receiverId").post(verifyJWT, sendMessage);
router.route("/users").post(verifyJWT, getUserConversations);

export default router;
