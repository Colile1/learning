// controllers/languageController.js

const programmingLanguages = require('../models/programmingLanguages');

// This function handles GET requests for programming languages
exports.getLanguages = (req, res) => {
  res.json(programmingLanguages);
};
