// controllers/dailyContentController.js

const dailyContent = require('../models/dailyContent');

exports.getDailyContent = (req, res) => {
  res.json(dailyContent);
};
