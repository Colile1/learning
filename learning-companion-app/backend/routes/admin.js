const express = require('express');
const router = express.Router();
const { authenticateAdmin, requireAdmin } = require('../middleware/adminMiddleware');
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdminStats,
  seedSuperAdmin
} = require('../controllers/adminController');

// Seed superAdmin on route access (for development)
router.get('/seed', seedSuperAdmin);

// All admin routes require authentication and admin role
router.use(authenticateAdmin);
router.use(requireAdmin);

// Get admin dashboard stats
router.get('/stats', getAdminStats);

// Get all users
router.get('/users', getAllUsers);

// Update user role
router.put('/users/role', updateUserRole);

// Delete user
router.delete('/users/:userId', deleteUser);

module.exports = router;
