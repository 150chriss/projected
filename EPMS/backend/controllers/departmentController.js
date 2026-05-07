const Department = require("../models/Department");

exports.createDepartment = async (req, res) => {
  const dept = await Department.create(req.body);
  res.json(dept);
};

exports.getDepartments = async (req, res) => {
  const depts = await Department.find();
  res.json(depts);
};