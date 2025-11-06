const Quiz = require('../models/quiz');

// Create new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions, topic, skillLevel, language, categories, isCached } = req.body;

    if (!title || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }

    const newQuiz = await Quiz.create({
      title,
      questions,
      topic,
      skillLevel,
      language,
      categories,
      isCached,
      createdBy: req.user?.username || 'system'
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all quizzes (with filters)
exports.getAllQuizzes = async (req, res) => {
  try {
    const { language, skillLevel } = req.query;
    const filter = {};
    
    if (language) filter.language = language;
    if (skillLevel) filter.skillLevel = skillLevel;

    const quizzes = await Quiz.find(filter);
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get random quiz
exports.getRandomQuiz = async (req, res) => {
  try {
    const { language, skillLevel } = req.query;
    const quizzes = await Quiz.find({ language, skillLevel });
    
    if (!quizzes.length) {
      return res.status(404).json({ message: "No quiz found" });
    }
    
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    res.json(randomQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};