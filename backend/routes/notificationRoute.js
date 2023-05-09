const express = require("express");
const { getAll, add, wipe } = require("../controllers/notificationController");
const { isAuthenticatedUser, ensureOfficialPlacementTeam } = require("../middleware/auth");

const router = express.Router();

router.route("/getAll").post(isAuthenticatedUser, getAll);
router.route("/add").post(isAuthenticatedUser, ensureOfficialPlacementTeam, add);
router.route("/wipe").put(isAuthenticatedUser, wipe);

module.exports = router