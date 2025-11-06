import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Generate token
const generateToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

// ✅ REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (password hash handled in pre-save middleware)
    const user = new User({ name: username, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, username: user.name, email: user.email, hasCompletedAssessment: user.hasCompletedAssessment },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN USER (username or email)
export const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { name: usernameOrEmail }],
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, username: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};