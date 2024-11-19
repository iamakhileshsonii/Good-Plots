import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  acceptSaleNotationConversation,
  checkExistingConversation,
  getConversationUsers,
  getSaleNotationMessage,
  saleNotationConversation,
  sendLawyerDocMessage,
  sendSaleNotationMessage,
} from "../controllers/saleNotation.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/get-conversation").get(verifyJWT, saleNotationConversation);
router.route("/get-users").get(verifyJWT, getConversationUsers);

router.route("/send-message").post(verifyJWT, sendSaleNotationMessage);
router.route("/send-lawyer-message/:conversationId").post(
  verifyJWT,
  upload.fields([
    { name: "token_doc", maxCount: 1 },
    { name: "earnestMoney_doc", maxCount: 1 },
    { name: "saleDeed_doc", maxCount: 1 },
  ]),
  sendLawyerDocMessage
);

router
  .route("/get-message/:conversationId")
  .get(verifyJWT, getSaleNotationMessage);

router
  .route("/accept-offer/:conversationId")
  .patch(verifyJWT, acceptSaleNotationConversation);

router
  .route("/conversationExists/:propertyId")
  .get(verifyJWT, checkExistingConversation);
export default router;
