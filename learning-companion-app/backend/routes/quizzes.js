const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authenticateToken = require('../middleware/auth');

// Public routes
router.get('/', quizController.getAllQuizzes);
router.get('/random', quizController.getRandomQuiz);
router.get('/:id', quizController.getQuizById);

// Protected routes (require authentication)
router.post('/', authenticateToken, quizController.createQuiz);
router.delete('/:id', authenticateToken, quizController.deleteQuiz);

module.exports = router;