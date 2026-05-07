const Salary = require("../models/Salary");

exports.createSalary = async (req, res) => {
  const salary = await Salary.create(req.body);
  res.json(salary);
};

exports.getSalaries = async (req, res) => {
  const salaries = await Salary.find()
    .populate({
      path: "employee",
      populate: { path: "department" }
    });
  res.json(salaries);
};

exports.updateSalary = async (req, res) => {
  const updated = await Salary.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteSalary = async (req, res) => {
  await Salary.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};