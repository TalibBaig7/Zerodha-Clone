require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const User = require("./model/UserModel");

// Routes
const AuthRoutes = require("./routes/AuthRoutes");

const PORT = process.env.PORT || 3001;
const uri = process.env.MONGO_URI;

const app = express();
app.set("trust proxy", 1);

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://zerodha-clone-frontend-08fo.onrender.com",
    credentials: true,
  })
);
app.options(
  "/",
  cors({
    origin: "https://zerodha-clone-frontend-08fo.onrender.com",
    credentials: true,
  })
);
app.use(cookieParser());

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existed = await User.findOne({ email });
    if (existed) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });

    res.json({ message: "Signup successful!", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup failed.", error: error.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password!" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Protected route
app.get("/api/me", authMiddleware, (req, res) => {
  res.json({ message: "Authorized", user: req.user });
});

// DB connect
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ DB connected!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB error:", err));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Holdings
app.get("/allHoldings", async (req, res) => {
  const data = await HoldingsModel.find({});
  res.json(data);
});

// Positions
app.get("/allPositions", async (req, res) => {
  const data = await PositionsModel.find({});
  res.json(data);
});

// Orders
app.get("/allOrders", async (req, res) => {
  const data = await OrdersModel.find({});
  res.json(data);
});

// Create order
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    if (!name || !qty || !price || !mode)
      return res.status(400).json({ error: "Missing fields" });

    const order = await OrdersModel.create({
      name,
      qty,
      price,
      mode,
    });

    res.json({ message: "Order created", order });
  } catch (error) {
    res.status(500).json({ error: "Error", details: error.message });
  }
});

app.use("/auth", AuthRoutes);
