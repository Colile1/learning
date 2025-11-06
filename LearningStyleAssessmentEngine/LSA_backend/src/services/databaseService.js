/**
 * MongoDB-backed Database Service for LSA_backend
 *
 * This service re-uses the connection helper from the learning-companion-app
 * to ensure both applications connect to the same MongoDB instance (via
 * the shared environment variable MONGO_URI).
 */

const mongoose = require('mongoose');
const connectDB = require('../../../learning-companion-app/backend/config/db');

// Initialize the shared DB connection (connectDB uses mongoose internally)
connectDB();

// Define the Result schema for storing assessment results
const ResultSchema = new mongoose.Schema({
    userId: { type: String, default: 'anonymous' },
    submittedAt: { type: Date, default: Date.now },
    // Recommendation structure returned by recommendationEngine
    recommendation: { type: mongoose.Schema.Types.Mixed },
    // Detailed per-section scores
    detailedScores: { type: mongoose.Schema.Types.Mixed },
    // Background/profile info
    backgroundProfile: { type: mongoose.Schema.Types.Mixed },
    // Raw answers payload
    rawAnswers: { type: mongoose.Schema.Types.Mixed }
}, { collection: 'lsa_results' });

// Avoid model overwrite issues in server reloads
const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);

/**
 * Save a new assessment result to MongoDB
 */
const saveResult = async (resultData) => {
    try {
        console.log('DATABASE_SERVICE (mongo): Saving result for user:', resultData.userId);
        const doc = new Result(resultData);
        const saved = await doc.save();
        console.log('DATABASE_SERVICE (mongo): Result saved with _id:', saved._id);
        return saved.toObject();
    } catch (error) {
        console.error('DATABASE_SERVICE (mongo): Error saving result:', error);
        throw error;
    }
};

/**
 * Retrieve a single result by its MongoDB _id.
 * Falls back to searching numeric `id` field if invalid ObjectId (for legacy compatibility).
 */
const getResultById = async (id) => {
    try {
        console.log('DATABASE_SERVICE (mongo): Retrieving result with id:', id);
        if (mongoose.isValidObjectId(id)) {
            return await Result.findById(id).lean();
        }
        // Legacy numeric id support (if previous in-memory records are referenced)
        return await Result.findOne({ id }).lean();
    } catch (error) {
        console.error('DATABASE_SERVICE (mongo): Error retrieving result by id:', error);
        throw error;
    }
};

/**
 * Retrieve all saved results
 */
const getAllResults = async () => {
    try {
        console.log('DATABASE_SERVICE (mongo): Retrieving all results');
        return await Result.find({}).lean();
    } catch (error) {
        console.error('DATABASE_SERVICE (mongo): Error retrieving all results:', error);
        throw error;
    }
};

module.exports = {
    saveResult,
    getResultById,
    getAllResults
};