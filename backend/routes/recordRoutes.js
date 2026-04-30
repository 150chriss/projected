const express = require('express');
const router = express.Router();
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/recordController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, getRecords);
router.post('/', verifyToken, createRecord);
router.put('/:id', verifyToken, updateRecord);
router.delete('/:id', verifyToken, deleteRecord);

module.exports = router;
