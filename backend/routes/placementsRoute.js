const express = require("express");
const { getAll, add, update } = require("../controllers/placementsController");
const { isAuthenticatedUser, ensureOfficialPlacementTeam } = require("../middleware/auth");

const router = express.Router();

router.route("/getAll").post(getAll);
router.route("/add").post(isAuthenticatedUser, ensureOfficialPlacementTeam, add);
router.route("/update").post(isAuthenticatedUser, ensureOfficialPlacementTeam, update);

module.exports = router