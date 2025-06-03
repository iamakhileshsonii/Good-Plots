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
  checkAuth,
  allbrokers,
  alladmins,
  alluserclient,
  allbuyerseller,
  alllawyers,
  allUsers,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/check-auth").post(verifyJWT, checkAuth);

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

// Get users by role
router.route("/all-users").get(allUsers);
router.route("/all-brokers").get(allbrokers);
router.route("/all-lawyer").get(alllawyers);
router.route("/all-buyer-seller").get(allbuyerseller);
router.route("/all-user-client").get(alluserclient);
router.route("/all-admin").get(alladmins);
export default router;
