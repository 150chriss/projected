const db = require('../config/db');

const getRecords = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT sr.recordNumber, sr.serviceDate, sr.plateNumber, sr.serviceCode,
             c.model, c.type, c.driverPhone, c.mechanicName,
             s.serviceName, s.servicePrice
      FROM ServiceRecord sr
      JOIN Car c ON sr.plateNumber = c.plateNumber
      JOIN Services s ON sr.serviceCode = s.serviceCode
      ORDER BY sr.serviceDate DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createRecord = async (req, res) => {
  const { serviceDate, plateNumber, serviceCode } = req.body;
  if (!serviceDate || !plateNumber || !serviceCode)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const [result] = await db.query(
      'INSERT INTO ServiceRecord (serviceDate, plateNumber, serviceCode) VALUES (?, ?, ?)',
      [serviceDate, plateNumber, serviceCode]
    );
    res.status(201).json({ message: 'Record created', recordNumber: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { serviceDate, plateNumber, serviceCode } = req.body;

  try {
    await db.query(
      'UPDATE ServiceRecord SET serviceDate=?, plateNumber=?, serviceCode=? WHERE recordNumber=?',
      [serviceDate, plateNumber, serviceCode, id]
    );
    res.json({ message: 'Record updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM ServiceRecord WHERE recordNumber = ?', [id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getRecords, createRecord, updateRecord, deleteRecord };
