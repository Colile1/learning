require('dotenv').config({ path: __dirname + '/.env' });
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Security + logging middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Learning Companion API is running ✅');
});

/* ===== API ROUTES ===== */

// Languages
app.use('/api/languages', require('./routes/languages'));

// Methodologies
app.use('/api/methodologies', require('./routes/methodologies'));

// Tools
app.use('/api/tools', require('./routes/tools'));

// Algorithms
app.use('/api/algorithms', require('./routes/algorithms'));

// Practices
app.use('/api/practices', require('./routes/practices'));

// Debug Tips
app.use('/api/debugtips', require('./routes/debugTips'));

// Code Review
app.use('/api/codereview', require('./routes/codeReview'));

// Project Management
app.use('/api/projectmanagement', require('./routes/projectManagement'));

// Daily Content
app.use('/api/dailycontent', require('./routes/dailyContent'));

// Educational Content
app.use('/api/educationalcontent', require('./routes/educationalContent'));

// Users
app.use('/api/users', require('./routes/users')); // user routes include bookmarks

// Authentication
app.use('/api/auth', require('./routes/auth'));

// Add this to your existing app.js:
app.use('/api/quizzes', require('./routes/quizzes'));

// AI Routes
app.use('/api/ai', require('./routes/ai'));

// Project Guides
app.use('/api/project-guides', require('./routes/projectGuides'));

// Bookmarks (optional top-level route)
app.use('/api/bookmarks', require('./routes/bookmarks'));
// ✅ This will point to ./routes/bookmarks.js where we handle GET, POST, DELETE with authentication

// Admin routes
app.use('/api/admin', require('./routes/admin'));

/* ===== 404 and ERROR HANDLING ===== */

// 404 - Not Found handler
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// General error handler
app.use((err, req, res, next) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// Centralized error middleware
app.use(errorHandler);

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`🤖 AI Service: OpenAI GPT-4o-mini`);
  console.log(`🌐 API available at: http://localhost:${PORT}`);
});