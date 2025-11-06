const express = require('express');
const router = express.Router();
const educationalContentController = require('../controllers/educationalContentController');
const authenticateToken = require('../middleware/auth');

// Public - Get all content
router.get('/', educationalContentController.getAllEducationalContent);


// Public - Search content by topic
router.get('/search', educationalContentController.searchContent);

// Protected - Create new content
router.post('/', authenticateToken, educationalContentController.createContent);

// Protected - Add multiple educational content entries
router.post('/bulk', authenticateToken, educationalContentController.addMultipleEducationalContent);

router.delete('/all', authenticateToken, educationalContentController.deleteAllEducationalContent);


module.exports = router;
