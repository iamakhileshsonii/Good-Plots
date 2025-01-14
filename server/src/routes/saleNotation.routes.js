import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  acceptOffer,
  acceptSaleNotationConversation,
  checkExistingConversation,
  counterOffer,
  getAllConversation,
  getConversationUsers,
  getSaleNotationById,
  getSaleNotationMessage,
  isSaleNotationExists,
  saleNotationConversation,
  sendLawyerDocMessage,
  sendMessageByBroker,
  sendMessageByLawyer,
  sendSaleNotationMessage,
} from "../controllers/saleNotation.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/is-saleNotation-exists").post(verifyJWT, isSaleNotationExists);
router.route("/get-conversation").get(verifyJWT, getAllConversation);
router.route("/:conversationId").get(verifyJWT, getSaleNotationById);
router.route("/accept-offer/:conversationId").post(verifyJWT, acceptOffer);
router.route("/counter-offer/:conversationId").post(verifyJWT, counterOffer);
router
  .route("/lawyer-message/:conversationId")
  .post(verifyJWT, sendMessageByLawyer); //LAWYER MESSAGE
router
  .route("/broker-message/:conversationId")
  .post(verifyJWT, sendMessageByBroker); //BROKER MESSAGE

router.route("/get-users").get(verifyJWT, getConversationUsers);
router.route("/counter-offer").post(verifyJWT); //COUNTER OFFER

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
