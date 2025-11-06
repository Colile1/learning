// routes/codeReview.js

const express = require('express');
const router = express.Router();

const { getCodeReviewGuidelines } = require('../controllers/codeReviewController');

router.get('/', getCodeReviewGuidelines);

module.exports = router;
