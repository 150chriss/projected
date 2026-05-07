const db = require('../config/db');

const getCars = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Car');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createCar = async (req, res) => {
  const { plateNumber, type, model, manufacturingYear, driverPhone, mechanicName } = req.body;
  if (!plateNumber || !type || !model || !manufacturingYear || !driverPhone || !mechanicName)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    await db.query(
      'INSERT INTO Car (plateNumber, type, model, manufacturingYear, driverPhone, mechanicName) VALUES (?, ?, ?, ?, ?, ?)',
      [plateNumber, type, model, manufacturingYear, driverPhone, mechanicName]
    );
    res.status(201).json({ message: 'Car added successfully' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ message: 'Plate number already exists' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCars, createCar };
