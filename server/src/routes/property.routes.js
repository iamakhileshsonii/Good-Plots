import {
  getCurrentPropertyData,
  getProperty,
} from "../controllers/property.controller.js";

import router from "./form.routes.js";

router.route("/:propertyId").get(getCurrentPropertyData);

export default router;
