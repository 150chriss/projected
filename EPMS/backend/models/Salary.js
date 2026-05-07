const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  grossSalary: Number,
  totalDeduction: Number,
  netSalary: Number,
  month: String
});

// Auto-calculate net salary before saving
salarySchema.pre("save", function (next) {
  this.netSalary = this.grossSalary - this.totalDeduction;
  next();
});

module.exports = mongoose.model("Salary", salarySchema);