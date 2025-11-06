// controllers/toolsController.js
const frameworksAndTools = require('../models/tools');

exports.getTools = (req, res) => {
  res.json(frameworksAndTools);
};
