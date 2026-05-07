const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/departmentController");

router.post("/", ctrl.createDepartment);
router.get("/", ctrl.getDepartments);

module.exports = router;