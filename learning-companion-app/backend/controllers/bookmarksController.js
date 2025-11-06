const bookmarks = require('../models/bookmarks');

// GET all bookmarks
exports.getBookmarks = (req, res) => {
  res.json(bookmarks);
};
