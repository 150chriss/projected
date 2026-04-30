const db = require('../config/db');

// Invoice: full details for a single payment
const getInvoice = async (req, res) => {
  const { paymentNumber } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT p.paymentNumber, p.amountPaid, p.paymentDate,
             sr.serviceDate, sr.plateNumber, sr.recordNumber,
             c.model, c.type, c.manufacturingYear, c.driverPhone, c.mechanicName,
             s.serviceName, s.servicePrice,
             u.username AS receivedBy
      FROM Payment p
      JOIN ServiceRecord sr ON p.recordNumber = sr.recordNumber
      JOIN Car c ON sr.plateNumber = c.plateNumber
      JOIN Services s ON sr.serviceCode = s.serviceCode
      LEFT JOIN User u ON u.userId = p.receivedBy
      WHERE p.paymentNumber = ?
    `, [paymentNumber]);

    if (rows.length === 0) return res.status(404).json({ message: 'Invoice not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Daily report: all services on a given date with totals per car
const getDailyReport = async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: 'Date query param required' });

  try {
    const [rows] = await db.query(`
      SELECT sr.recordNumber, sr.serviceDate, sr.plateNumber,
             c.model, c.type, c.driverPhone, c.mechanicName,
             s.serviceName, s.servicePrice,
             p.amountPaid, p.paymentDate
      FROM ServiceRecord sr
      JOIN Car c ON sr.plateNumber = c.plateNumber
      JOIN Services s ON sr.serviceCode = s.serviceCode
      LEFT JOIN Payment p ON p.recordNumber = sr.recordNumber
      WHERE sr.serviceDate = ?
      ORDER BY sr.plateNumber
    `, [date]);

    // Group by plate number
    const grouped = {};
    rows.forEach(row => {
      if (!grouped[row.plateNumber]) {
        grouped[row.plateNumber] = { plateNumber: row.plateNumber, model: row.model, type: row.type, driverPhone: row.driverPhone, mechanicName: row.mechanicName, services: [], total: 0 };
      }
      grouped[row.plateNumber].services.push({ recordNumber: row.recordNumber, serviceName: row.serviceName, servicePrice: row.servicePrice, amountPaid: row.amountPaid, paymentDate: row.paymentDate });
      grouped[row.plateNumber].total += parseFloat(row.servicePrice || 0);
    });

    res.json({ date, report: Object.values(grouped) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getInvoice, getDailyReport };
