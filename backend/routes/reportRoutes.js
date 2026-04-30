const express = require('express');
const router = express.Router();
const { getInvoice, getDailyReport } = require('../controllers/reportController');
const verifyToken = require('../middleware/auth');

router.get('/invoice/:paymentNumber', verifyToken, getInvoice);
router.get('/daily', verifyToken, getDailyReport);

module.exports = router;
