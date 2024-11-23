import {
  getAllPendingProperties,
  getAllVerifiedProperties,
  getCurrentPropertyData,
  getProperty,
} from "../controllers/property.controller.js";

import router from "./form.routes.js";

router.route("/verified-properties").get(getAllVerifiedProperties);
router.route("/pending-properties").get(getAllPendingProperties);
router.route("/:propertyId").get(getCurrentPropertyData);

export default router;
