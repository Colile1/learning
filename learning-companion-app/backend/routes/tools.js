// routes/tools.js
const express = require('express');
const router = express.Router();
const { getTools } = require('../controllers/toolsController');

router.get('/', getTools);

module.exports = router;
