const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register (optional but powerful in exam)
exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed
  });

  res.json(user);
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  // create session
  req.session.user = {
    id: user._id,
    username: user.username
  };

  res.json({ message: "Login successful" });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
};

// Check session
exports.checkAuth = (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};