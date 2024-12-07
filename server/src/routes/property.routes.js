import multer from "multer";
import {
  getAllPendingProperties,
  getAllVerifiedProperties,
  getFilteredProperty,
  propertyKycImages,
  savePropertyKyc,
} from "../controllers/property.controller.js";
import router from "./form.routes.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/verified-properties").get(getAllVerifiedProperties);
router.route("/pending-properties").get(getAllPendingProperties);
router.route("/filter").get(getFilteredProperty);

// Uncomment and modify the route for handling file uploads
router.route("/kyc-images").post(
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
  propertyKycImages
);

router.route("/kyc/:propertyId").post(savePropertyKyc);
router.route("/:propertyId").get(getFilteredProperty);

export default router;
