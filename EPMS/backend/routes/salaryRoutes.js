const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/salaryController");

const auth = require("../middleware/auth");

router.post("/", auth, ctrl.createSalary);
router.get("/", auth, ctrl.getSalaries);
router.put("/:id", auth, ctrl.updateSalary);
router.delete("/:id", auth, ctrl.deleteSalary);

module.exports = router;