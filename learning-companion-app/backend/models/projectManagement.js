const mongoose = require('mongoose');

const projectManagementSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProjectManagement', projectManagementSchema);