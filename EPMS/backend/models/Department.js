const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentCode: { type: String, required: true, unique: true },
  departmentName: String,
  grossSalary: Number
});

module.exports = mongoose.model("Department", departmentSchema);