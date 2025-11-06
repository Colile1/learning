// controllers/userController.js
const User = require('../models/user'); // ensure path/casing matches your file
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create new user profile
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, learningPreferences } = req.body;

        // Hash password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            learningPreferences
        });

        const savedUser = await user.save();
        // Do not return password hash
        const safeUser = savedUser.toObject();
        delete safeUser.password;
        res.status(201).json(safeUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all user profiles
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add bookmark
exports.addBookmark = async (req, res) => {
    try {
        const userId = req.user && req.user.userId;  // from JWT middleware
        const { contentId, contentType = "EducationalContent", notes = "" } = req.body;

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!contentId) return res.status(400).json({ message: 'Content ID is required' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // check duplicate by comparing objectId strings
        const already = user.bookmarks.some(
            (b) => b.contentId && b.contentId.toString() === contentId.toString()
        );
        if (already) {
            return res.status(400).json({ message: 'Content already bookmarked' });
        }

        user.bookmarks.push({ contentId, contentType, notes });
        await user.save();

        res.json({ message: 'Bookmark added', bookmarks: user.bookmarks });
    } catch (error) {
        console.error("addBookmark error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Remove bookmark
exports.removeBookmark = async (req, res) => {
    try {
        const userId = req.user && req.user.userId;
        // prefer route param: DELETE /api/bookmarks/:contentId
        const contentId = req.params.contentId || req.body.contentId;

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!contentId) return res.status(400).json({ message: 'Content ID is required' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const beforeCount = user.bookmarks.length;
        user.bookmarks = user.bookmarks.filter(
            (b) => b.contentId.toString() !== contentId.toString()
        );

        if (user.bookmarks.length === beforeCount) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        await user.save();

        res.json({ message: 'Bookmark removed', bookmarks: user.bookmarks });
    } catch (error) {
        console.error("removeBookmark error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get all bookmarks (with optional populate)
exports.getBookmarks = async (req, res) => {
    try {
        const userId = req.user && req.user.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        // populate content references (if you want the actual content data)
        const user = await User.findById(userId).populate({
            path: 'bookmarks.contentId',
            model: 'EducationalContent' // ensure this model exists
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ bookmarks: user.bookmarks });
    } catch (error) {
        console.error("getBookmarks error:", error);
        res.status(500).json({ message: error.message });
    }
};
