const express = require("express");
const { getAll, getOne, add, update, remove, appliedStudents } = require("../controllers/companyController");
const { isAuthenticatedUser, authorizePermissions, ensureOfficialPlacementTeam } = require("../middleware/auth");

const router = express.Router();

router.route("/getAll").post(isAuthenticatedUser, getAll);
router.route("/getOne/:company_id").get(isAuthenticatedUser, getOne);
router.route("/add").post(isAuthenticatedUser, ensureOfficialPlacementTeam, add);
router.route("/update").put(isAuthenticatedUser, ensureOfficialPlacementTeam, update);
router.route("/remove").post(isAuthenticatedUser, ensureOfficialPlacementTeam, remove);
router.route("/applied/:company_id").get(isAuthenticatedUser, appliedStudents);

module.exports = router