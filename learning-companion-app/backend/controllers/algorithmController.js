// controllers/algorithmController.js

const dataStructuresAndAlgorithms = require('../models/algorithms');

exports.getAlgorithms = (req, res) => {
  res.json(dataStructuresAndAlgorithms);
};
