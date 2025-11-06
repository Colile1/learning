// controllers/practicesController.js
const bestCodingPractices = require('../models/practices');

exports.getPractices = (req, res) => {
  try {
    // Group by category
    const categorized = bestCodingPractices.reduce((acc, practice) => {
      if (!acc[practice.category]) acc[practice.category] = [];
      acc[practice.category].push(practice);
      return acc;
    }, {});

    res.json(categorized);
  } catch (err) {
    console.error("Error fetching practices:", err);
    res.status(500).json({ message: "Server error fetching practices" });
  }
};
