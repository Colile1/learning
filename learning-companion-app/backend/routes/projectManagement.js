const express = require('express');
const router = express.Router();
const {
  getProjectManagementTips,
  createProjectManagementTip,
  deleteProjectManagementTip
} = require('../controllers/projectManagementController');

// GET all guides
router.get('/', getProjectManagementTips);

// POST new guide
router.post('/', createProjectManagementTip);

// DELETE a guide by ID
router.delete('/:id', deleteProjectManagementTip);

module.exports = router;