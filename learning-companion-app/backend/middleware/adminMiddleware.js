const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = { userId: decoded.userId || decoded.id };
    next();
  });
};

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    req.user = user; // Attach full user object
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { authenticateAdmin, requireAdmin };
