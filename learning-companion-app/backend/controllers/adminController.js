const User = require('../models/User');
const bcrypt = require('bcrypt');

// Hard-coded superAdmin account details
const SUPER_ADMIN = {
  username: 'superadmin',
  email: 'superadmin@learningcompanion.com',
  password: 'admin123',
  role: 'Admin'
};

// Function to seed superAdmin if not exists
const seedSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ username: SUPER_ADMIN.username });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(SUPER_ADMIN.password, 10);
      const superAdmin = new User({
        username: SUPER_ADMIN.username,
        email: SUPER_ADMIN.email,
        password: hashedPassword,
        role: SUPER_ADMIN.role
      });
      await superAdmin.save();
      console.log('SuperAdmin account created successfully');
    } else {
      console.log('SuperAdmin account already exists');
    }
  } catch (err) {
    console.error('Error seeding superAdmin:', err);
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User role updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin dashboard stats
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'Admin' });
    const studentUsers = await User.countDocuments({ role: 'Student' });
    res.json({
      totalUsers,
      adminUsers,
      studentUsers
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  seedSuperAdmin,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdminStats
};
