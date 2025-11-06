// controllers/debugTipsController.js

const debuggingAndCleanCodeTips = require('../models/debugTips');

exports.getDebugTips = (req, res) => {
  res.json(debuggingAndCleanCodeTips);
};
