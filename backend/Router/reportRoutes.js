const express = require('express');
const router = express.Router();
const { getPDFReport, getCSVReport } = require('../Controller/reportController');

// Use query params like /api/reports/pdf?userId=123
router.get('/csv', getCSVReport);
router.get('/pdf', getPDFReport);

module.exports = router;
