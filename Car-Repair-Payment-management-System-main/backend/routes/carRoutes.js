const express = require('express');
const router = express.Router();
const { getCars, createCar } = require('../controllers/carController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getCars);
router.post('/', verifyToken, createCar);

module.exports = router;
