const express = require('express');
const router = express.Router();
const { getPayments, createPayment } = require('../controllers/paymentController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getPayments);
router.post('/', verifyToken, createPayment);

module.exports = router;
