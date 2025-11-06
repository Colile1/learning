const ProjectManagement = require('../models/projectManagement');

// GET all guides
exports.getProjectManagementTips = async (req, res) => {
  try {
    const tips = await ProjectManagement.find();
    res.json(tips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch project management tips.' });
  }
};

// POST new guide
exports.createProjectManagementTip = async (req, res) => {
  try {
    const newGuide = new ProjectManagement(req.body);
    await newGuide.save();
    res.status(201).json({ message: "Project management guide added", data: newGuide });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add project management guide" });
  }
};

// DELETE guide by ID
exports.deleteProjectManagementTip = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ProjectManagement.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Guide not found" });
    res.json({ message: "Project management guide deleted", data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project management guide" });
  }
};