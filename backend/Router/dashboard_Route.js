const express = require('express');
const router = express.Router();
const dashboardController = require('../Controller/dashboard_controller');

router.get('/dashboard/:userId', dashboardController.getDashboardData);
module.exports = router;
