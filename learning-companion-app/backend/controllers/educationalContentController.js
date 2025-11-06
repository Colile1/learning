const EducationalContent = require('../models/EducationalContent');

// Create new educational content
exports.createContent = async (req, res) => {
    try {
        const { language, topic, summary, detailedContent, codeExamples, externalLinks } = req.body;

        const content = new EducationalContent({
            language,
            topic,
            summary,
            detailedContent,
            codeExamples,
            externalLinks
        });


        const savedContent = await content.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all educational content, optionally filter by language
exports.getAllEducationalContent = async (req, res) => {
  try {
    const language = req.query.language; // ?language=Python
    const filter = language ? { language } : {}; // if language query exists, filter by language
    const content = await EducationalContent.find(filter);
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search by topic
exports.searchContent = async (req, res) => {
    try {
        const query = req.query.q;
        const results = await EducationalContent.find({ topic: { $regex: query, $options: 'i' } });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMultipleEducationalContent = async (req, res) => {
    try {
        const contents = req.body;

        // Validate that each entry has language, topic, etc.
        const validatedContents = contents.map(content => ({
            language: content.language,
            topic: content.topic,
            summary: content.summary,
            detailedContent: content.detailedContent,
            codeExamples: content.codeExamples,
            externalLinks: content.externalLinks
        }));

        const insertedContent = await EducationalContent.insertMany(validatedContents);
        res.status(201).json(insertedContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAllEducationalContent = async (req, res) => {
    try {
        await EducationalContent.deleteMany({});
        res.json({ message: 'All educational content deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

