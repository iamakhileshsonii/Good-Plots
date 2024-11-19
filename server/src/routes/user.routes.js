import { Router } from "express";

const router = Router();

//Import Routes
import {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  updateAvatar,
  currentUserInfo,
  getAllUsersData,
  getMyListings,
  refreshAccessToken,
  getPropertyOwnerInfo,
  manageUsers,
  assignedPincodes,
  assignNewPincode,
  assignPincodeToBroker,
  assignPincodeToLawyer,
  assignedPincodesForBrokers,
  assignedPincodesForLawyers,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

//Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update-password").post(verifyJWT, updatePassword);
router.route("/update-avatar").patch(upload.single("avatar"), updateAvatar);
router.route("/user-profile").get(verifyJWT, currentUserInfo);
router.route("/get-all-users").get(getAllUsersData);
router.route("/my-listings").get(verifyJWT, getMyListings);
router.route("/refresh-access-token").post(refreshAccessToken);
router.route("/propertyowner-detail/:ownerId").get(getPropertyOwnerInfo);
router.route("/manage-users").get(verifyJWT, manageUsers);
router.route("/get-appointments").get();
router.route("/assingedPins").get(assignedPincodes);
router.route("/assign-pincode/:userId").post(assignNewPincode);
router.route("/assign-pincode-to-broker/:userId").post(assignPincodeToBroker);
router.route("/assign-pincode-to-lawyer/:userId").post(assignPincodeToLawyer);
router.route("/assigned-lawyers-pins").get(assignedPincodesForLawyers);
router.route("/assigned-brokers-pins").get(assignedPincodesForBrokers);
export default router;
