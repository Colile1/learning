// routes/languages.js

const express = require('express');
const router = express.Router();

const { getLanguages } = require('../controllers/languageController');

// Define the route for getting all languages
router.get('/', getLanguages);

module.exports = router;
