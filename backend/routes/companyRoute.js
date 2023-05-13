const express = require("express");
const { getAll, getOne, add, update, remove, appliedStudents, getAllAdmin } = require("../controllers/companyController");
const { isAuthenticatedUser, ensureOfficialPlacementTeam } = require("../middleware/auth");

const router = express.Router();

router.route("/getAll").post(isAuthenticatedUser, getAll);
router.route("/getAll_admin").post(isAuthenticatedUser, getAllAdmin);
router.route("/getOne/:company_id").get(isAuthenticatedUser, getOne);
router.route("/add").post(isAuthenticatedUser, ensureOfficialPlacementTeam, add);
router.route("/update").put(isAuthenticatedUser, ensureOfficialPlacementTeam, update);
router.route("/remove").post(isAuthenticatedUser, ensureOfficialPlacementTeam, remove);
router.route("/applied/:company_id").get(isAuthenticatedUser, appliedStudents);

module.exports = router