const express = require("express");
const User = require("../model/UserModel");

const { createSecretToken } = require("../util/SecretToken");

const bcrypt = require("bcryptjs");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "User already exists" });

    const user = await User.create({ email, username, password });
    const token = createSecretToken(user._id);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({ message: "Invalid credentials" });

    const token = createSecretToken(user._id);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
