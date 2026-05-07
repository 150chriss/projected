const db = require('../config/db');

const getServices = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Services');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createService = async (req, res) => {
  const { serviceName, servicePrice } = req.body;
  if (!serviceName || servicePrice === undefined)
    return res.status(400).json({ message: 'Service name and price are required' });

  try {
    await db.query('INSERT INTO Services (serviceName, servicePrice) VALUES (?, ?)', [serviceName, servicePrice]);
    res.status(201).json({ message: 'Service added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getServices, createService };
