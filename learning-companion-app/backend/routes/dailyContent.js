// routes/dailyContent.js

const express = require('express');
const router = express.Router();

const { getDailyContent } = require('../controllers/dailyContentController');

router.get('/', getDailyContent);

module.exports = router;
