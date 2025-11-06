// controllers/codeReviewController.js

const codeReviewGuidelines = require('../models/codeReview');

exports.getCodeReviewGuidelines = (req, res) => {
  res.json(codeReviewGuidelines);
};
