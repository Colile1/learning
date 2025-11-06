// routes/algorithms.js

const express = require('express');
const router = express.Router();

const { getAlgorithms } = require('../controllers/algorithmController');

router.get('/', getAlgorithms);

module.exports = router;
