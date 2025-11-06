// routes/debugTips.js

const express = require('express');
const router = express.Router();

const { getDebugTips } = require('../controllers/debugTipsController');

router.get('/', getDebugTips);

module.exports = router;
