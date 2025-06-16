const express = require('express');
const { getCSVReport, getPDFReport } = require('../Controller/reportController');
const router = express.Router();

router.get('/csv',  getCSVReport);
router.get('/pdf',  getPDFReport);

module.exports = router;
