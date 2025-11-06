// controllers/methodologyController.js

const developmentMethodologies = require('../models/methodologies');

// This function handles GET requests for methodologies
exports.getMethodologies = (req, res) => {
  res.json(developmentMethodologies);
};
