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
const JWT_SECRET = process.env.JWT_SECRET;

if (!uri) {
  console.error(
    "❌ MONGO_URI environment variable is missing! Set it in your hosting provider's Environment settings. The server will still start so /health and CORS can respond, but every DB-backed route will return 503 until this is fixed."
  );
}

if (!JWT_SECRET) {
  console.error(
    "❌ JWT_SECRET environment variable is missing! Set it in your hosting provider's Environment settings. Signup/Login will fail until this is fixed."
  );
}

const app = express();
app.set("trust proxy", 1);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} — Origin: ${req.headers.origin || "(none)"}`);
  next();
});

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------
// Build the allow-list from known deployment URLs + local dev + whatever is
// set in the FRONTEND_URL / DASHBOARD_URL env vars. Trailing slashes are
// stripped because "https://foo.com/" !== "https://foo.com" as a browser
// Origin header, and that mismatch is a very common source of silent CORS
// failures.
const stripTrailingSlash = (url) => (url ? url.replace(/\/+$/, "") : url);

const allowedOrigins = [
  "https://zerodha-clone-frontend-08fo.onrender.com",
  "https://zerodha-clone-dashboard-vd6u.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3002",
  stripTrailingSlash(process.env.FRONTEND_URL),
  stripTrailingSlash(process.env.DASHBOARD_URL),
].filter(Boolean);

console.log("✅ CORS allow-list:", allowedOrigins);

const corsOptions = {
  origin(origin, callback) {
    // Requests with no Origin header (curl, server-to-server, Render health
    // checks) are always allowed — there's no browser enforcing CORS there.
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(stripTrailingSlash(origin))) {
      return callback(null, true);
    }

    console.warn(`⚠️  CORS blocked request from origin: ${origin}`);
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Explicitly answer every preflight request so it never falls through to a
// route handler (which would 404 and confuse the browser's CORS error).
app.options(/.*/, cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------------------------------------------------------------------------
// DB readiness guard
// ---------------------------------------------------------------------------
// Previously the whole process refused to boot (process.exit(1)) if Mongo
// wasn't reachable at startup. On a host like Render that means the service
// crash-loops forever and every request just sees an infinite "waking up"
// placeholder with no CORS headers — which looks exactly like a CORS error
// from the browser, even though the real problem is the DB connection.
// Instead: start the HTTP server immediately, connect to Mongo in the
// background with retries, and have DB-backed routes fail fast with a clear
// 503 JSON error (which DOES carry CORS headers) until the DB is ready.
function requireDb(req, res, next) {
  if (mongoose.connection.readyState === 1) return next();
  return res.status(503).json({
    message:
      "Database not connected yet. Check MONGO_URI and your MongoDB Atlas Network Access list.",
  });
}

// Signup
app.post("/api/signup", requireDb, async (req, res) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "Server misconfigured: JWT_SECRET is not set." });
    }

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
      JWT_SECRET,
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
app.post("/api/login", requireDb, async (req, res) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "Server misconfigured: JWT_SECRET is not set." });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password!" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
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

  if (!JWT_SECRET) {
    return res.status(500).json({ message: "Server misconfigured: JWT_SECRET is not set." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
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

// Health check — Render/uptime monitors and manual "is it up" checks should
// hit this. Reports DB status too, since that's the most common failure.
app.get("/", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    message: "Server is running!",
    db: dbStates[mongoose.connection.readyState] || "unknown",
  });
});
app.get("/health", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    status: "ok",
    db: dbStates[mongoose.connection.readyState] || "unknown",
    uptimeSeconds: Math.round(process.uptime()),
  });
});

// Holdings
app.get("/allHoldings", requireDb, async (req, res) => {
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
app.get("/allPositions", requireDb, async (req, res) => {
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
app.get("/allOrders", requireDb, async (req, res) => {
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
app.post("/newOrder", requireDb, async (req, res) => {
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

// Legacy/alternate auth routes (kept for backwards compatibility — the
// current frontend uses /api/signup and /api/login above, not these).
app.use("/auth", AuthRoutes);

// ---------------------------------------------------------------------------
// 404 + error handlers (kept last, and kept as JSON so callers never see an
// HTML stack-trace page which some browsers can misreport as a CORS failure)
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

// ---------------------------------------------------------------------------
// Start server immediately; connect to Mongo in the background with retries
// ---------------------------------------------------------------------------
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

function connectDB() {
  if (!uri) return; // already logged above; nothing to retry without a URI
  mongoose
    .connect(uri)
    .then(() => console.log("✅ DB connected!"))
    .catch((err) => {
      console.error("❌ MongoDB connection error, retrying in 5s:", err.message);
      setTimeout(connectDB, 5000);
    });
}
connectDB();

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected, attempting to reconnect...");
  setTimeout(connectDB, 5000);
});
