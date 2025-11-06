// controllers/projectGuidesController.js
const projectGuides = require('../models/projectGuides');

exports.getProjectGuides = (req, res) => {
  res.json({ guides: projectGuides });
};
