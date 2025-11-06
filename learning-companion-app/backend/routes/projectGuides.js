// routes/projectGuides.js
const express = require('express');
const router = express.Router();
const { getProjectGuides } = require('../controllers/projectGuidesController');

router.get('/', getProjectGuides);

module.exports = router;
