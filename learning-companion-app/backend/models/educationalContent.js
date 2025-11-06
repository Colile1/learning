const mongoose = require('mongoose');

const educationalContentSchema = new mongoose.Schema({
    language: { type: String, required: true },
    topic: { type: String, required: true },
    summary: { type: String, required: true },
    detailedContent: { type: String, required: true },
    codeExamples: { type: String },
    externalLinks: { type: [String] },
    createdAt: { type: Date, default: Date.now }
});

const EducationalContent = mongoose.model('EducationalContent', educationalContentSchema);

module.exports = EducationalContent;
