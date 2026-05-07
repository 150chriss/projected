const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  position: String,
  address: String,
  telephone: String,
  gender: String,
  hiredDate: Date,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});

module.exports = mongoose.model("Employee", employeeSchema);