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

if (!uri) {
  console.error("❌ Error: MONGO_URI environment variable is missing!");
  process.exit(1);
}

const app = express();
app.set("trust proxy", 1);

app.use((req, res, next) => {
  console.log(`Request from Origin: ${req.headers.origin}`);
  next();
});

// Middleware - CORS
const corsOptions = {
  origin: [
    "https://zerodha-clone-frontend-08fo.onrender.com",
    "https://zerodha-clone-dashboard-vd6u.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:3002",
    process.env.FRONTEND_URL,
    process.env.DASHBOARD_URL
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

    // Create JWT token and set cookie (same as login)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction ? true : false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // Make cookie available for all paths
    });

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

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction ? true : false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // Make cookie available for all paths
    });

    res.json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction ? true : false,
    path: "/",
  });
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

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const data = await HoldingsModel.find({});
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching holdings", details: error.message });
  }
});

// Positions
app.get("/allPositions", async (req, res) => {
  try {
    const data = await PositionsModel.find({});
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching positions", details: error.message });
  }
});

// Orders
app.get("/allOrders", async (req, res) => {
  try {
    const data = await OrdersModel.find({});
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching orders", details: error.message });
  }
});

// Create order
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Create the order
    const order = await OrdersModel.create({
      name,
      qty,
      price,
      mode,
    });

    // If it's a BUY order, update the Holdings
    if (mode === "BUY") {
      const existingHolding = await HoldingsModel.findOne({ name });

      if (existingHolding) {
        // Update existing holding
        existingHolding.qty += qty;
        // Optionally update average price here if you want meaningful P&L
        // existingHolding.avg = ((existingHolding.avg * existingHolding.qty) + (price * qty)) / (existingHolding.qty + qty);
        await existingHolding.save();
      } else {
        // Create new holding
        await HoldingsModel.create({
          name,
          qty,
          avg: price,
          price: price,
          net: "+0.00%",
          day: "+0.00%",
          isLoss: false,
        });
      }
    }

    res.json({ message: "Order placed and executed", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res
      .status(500)
      .json({ error: "Error creating order", details: error.message });
  }
});

// Routes
app.use("/auth", AuthRoutes);

// DB connect and start server
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ DB connected!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
