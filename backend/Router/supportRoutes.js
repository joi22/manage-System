const express = require('express');
const router = express.Router();
const { submitSupport } = require('../Controller/supportController');

router.post('/:Id',  submitSupport);

module.exports = router;
