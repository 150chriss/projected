const db = require('../config/db');

const getPayments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.paymentNumber, p.amountPaid, p.paymentDate, p.recordNumber,
             sr.serviceDate, sr.plateNumber,
             c.model, c.type, c.driverPhone, c.mechanicName,
             s.serviceName, s.servicePrice,
             u.username AS receivedBy
      FROM Payment p
      JOIN ServiceRecord sr ON p.recordNumber = sr.recordNumber
      JOIN Car c ON sr.plateNumber = c.plateNumber
      JOIN Services s ON sr.serviceCode = s.serviceCode
      LEFT JOIN User u ON u.userId = p.receivedBy
      ORDER BY p.paymentDate DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createPayment = async (req, res) => {
  const { amountPaid, paymentDate, recordNumber } = req.body;
  const receivedBy = req.user.userId;

  if (!amountPaid || !paymentDate || !recordNumber)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    await db.query(
      'INSERT INTO Payment (amountPaid, paymentDate, recordNumber, receivedBy) VALUES (?, ?, ?, ?)',
      [amountPaid, paymentDate, recordNumber, receivedBy]
    );
    res.status(201).json({ message: 'Payment recorded' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getPayments, createPayment };
