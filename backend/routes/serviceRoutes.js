const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getServices);
router.post('/', verifyToken, createService);

module.exports = router;
