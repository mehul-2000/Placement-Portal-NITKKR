const express = require("express");
const { getUser, registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, sendOTP, updateBatch, getProfile, getPermission, updateProfile, getOne, updateOne, contributions, timeline, achievements } = require("../controllers/userController");
const { isAuthenticatedUser, ensureOfficialPlacementTeam, ensureStudent } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser)
router.route('/sendOTP').post(sendOTP);
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/profile").get(isAuthenticatedUser, getProfile)
router.route("/updateProfile").post(isAuthenticatedUser, updateProfile)
router.route("/permission").get(isAuthenticatedUser, getPermission)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/logout").get(isAuthenticatedUser, logout);
// Only admin can update its batch
router.route("/updateBatch").post(isAuthenticatedUser, ensureOfficialPlacementTeam, updateBatch);
router.route("/getOne/:college_id").get(isAuthenticatedUser, ensureOfficialPlacementTeam, getOne)
router.route("/updateOne").post(isAuthenticatedUser, ensureOfficialPlacementTeam, updateOne);

router.route("/timeline").get(isAuthenticatedUser, ensureStudent, timeline)
router.route("/contributions").get(isAuthenticatedUser, ensureStudent, contributions)
router.route("/achievements").get(isAuthenticatedUser, ensureStudent, achievements)

module.exports = router