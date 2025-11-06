// routes/methodologies.js

const express = require('express');
const router = express.Router();

const { getMethodologies } = require('../controllers/methodologyController');

router.get('/', getMethodologies);

module.exports = router;
