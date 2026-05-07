const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  res.json(emp);
};

exports.getEmployees = async (req, res) => {
  const emps = await Employee.find().populate("department");
  res.json(emps);
};