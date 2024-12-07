import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getInitialFormData,
  submitInitialForm,
  submitKycForm,
  submitTestForm,
} from "../controllers/form.controller.js";
import { kycListing } from "../models/kycListing.model.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// SUBMIT INITIAL FORM
router.route("/initial-form").post(verifyJWT, submitInitialForm);

// KYC FORM DATA
router.route("/kyc-listing").post(verifyJWT, kycListing);

//SINGLE INITIAL FORM DATA
router.route("/initial-form/:formid").get(verifyJWT, getInitialFormData);

//SUBMIT KYC FORM
router.route("/submit-kyc-form/:id").post(
  upload.fields([
    { name: "siteView", maxCount: 1 },
    { name: "materPlan", maxCount: 1 },
    { name: "location", maxCount: 1 },
    { name: "map", maxCount: 1 },
    { name: "exteriorView", maxCount: 1 },
    { name: "livingRoom", maxCount: 1 },
    { name: "bedroomsImage", maxCount: 1 },
    { name: "kitchen", maxCount: 1 },
    { name: "floorPlan", maxCount: 1 },
    { name: "otherPhoto", maxCount: 1 },
  ]),
  submitKycForm
);

// Route definition using multer middleware
router.route("/test-form").post(
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
    { name: "siteView", maxCount: 1 },
    { name: "materPlan", maxCount: 1 },
    { name: "location", maxCount: 1 },
    { name: "map", maxCount: 1 },
    { name: "otherPhoto", maxCount: 1 },
    { name: "exteriorView", maxCount: 1 },
    { name: "livingRoom", maxCount: 1 },
    { name: "bedroomsImage", maxCount: 1 },
    { name: "kitchen", maxCount: 1 },
    { name: "floorPlan", maxCount: 1 },
  ]),
  submitTestForm
);

export default router;
