const express = require('express');
const router = express.Router();
const { getBookmarks } = require('../controllers/bookmarksController');

router.get('/', getBookmarks);

module.exports = router;
