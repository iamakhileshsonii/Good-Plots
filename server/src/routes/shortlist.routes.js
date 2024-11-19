import { Router } from "express";
import {
  shortlistedFeeds,
  shortlistFeed,
} from "../controllers/shortlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/shortlistFeed/:feedId").post(verifyJWT, shortlistFeed);
router.route("/shortlisted-feeds").get(verifyJWT, shortlistedFeeds);

export default router;
