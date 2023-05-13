const express = require("express");
const { getStatus, apply, withdraw, withdrawOne } = require("../controllers/applyController");
const { isAuthenticatedUser, ensureOfficialPlacementTeam, ensureStudent, ensureStudentWithResume } = require("../middleware/auth");

const router = express.Router();

router.route("/getStatus/:company_id").get(isAuthenticatedUser, ensureStudent, getStatus);
router.route("/apply").post(isAuthenticatedUser, ensureStudentWithResume, apply);
router.route("/withdraw").post(isAuthenticatedUser, ensureStudent, withdraw);
router.route("/withdrawOne").post(isAuthenticatedUser, ensureOfficialPlacementTeam, withdrawOne);

module.exports = router;