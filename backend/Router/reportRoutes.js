const express = require('express');

const { getCSVReport, getPDFReport } = require('../Controller/reportController');
const router = express.Router();

router.get('/csv',  getCSVReport);
router.get('/pdf',  getPDFReport);

// const router = express.Router();
// const { getPDFReport, getCSVReport } = require('../Controller/reportController');

// // Use query params like /api/reports/pdf?userId=123
// router.get('/csv', getCSVReport);
// router.get('/pdf', getPDFReport);
// >>>>>>> d49b18853bd7dd006dc01b5e8dc93f6fa3f66241

module.exports = router;
