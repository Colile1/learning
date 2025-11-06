const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  explanation: String
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: String,
  skillLevel: String,
  language: String,
  categories: [String],
  questions: [questionSchema],
  isCached: Boolean,
  createdBy: String
});

module.exports = mongoose.model('Quiz', quizSchema);