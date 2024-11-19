import { Router } from "express";
import {
  ScheduleFeedAppointment,
  exploreFeed,
  likeFeed,
  likeStatus,
  likedFeeds,
} from "../controllers/feed.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//http://localhost:3001/api/v1/feed/explore-feed
router.route("/explore-feed").get(verifyJWT, exploreFeed);
router.route("/like/:feedId").post(verifyJWT, likeFeed);
router.route("/liked-status/:feedId").get(verifyJWT, likeStatus);
router.route("/liked-feeds").get(verifyJWT, likedFeeds);
router.route("/schedule-appointment").post(ScheduleFeedAppointment);

export default router;
