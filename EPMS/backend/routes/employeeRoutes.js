const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/employeeController");

router.post("/", ctrl.createEmployee);
router.get("/", ctrl.getEmployees);

module.exports = router;