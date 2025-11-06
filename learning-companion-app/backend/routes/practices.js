const express = require('express');
const router = express.Router();
const { getPractices } = require('../controllers/practicesController');

router.get('/', getPractices);

module.exports = router;
