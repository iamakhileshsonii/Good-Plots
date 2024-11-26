import {
  getAllPendingProperties,
  getAllVerifiedProperties,
  getCurrentPropertyData,
  getFilteredProperty,
  getProperty,
} from "../controllers/property.controller.js";

import router from "./form.routes.js";

router.route("/verified-properties").get(getAllVerifiedProperties);
router.route("/pending-properties").get(getAllPendingProperties);
router.route("/filter").get(getFilteredProperty);
router.route("/:propertyId").get(getFilteredProperty);

export default router;
