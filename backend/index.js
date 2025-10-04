require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import your models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const AuthRoutes = require("./routes/AuthRoutes");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ DB connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
  });

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// Get all orders
app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Create new order - MAIN ROUTE
app.post("/newOrder", async (req, res) => {
  console.log("🛒 New order received:", req.body);

  try {
    const { name, qty, price, mode } = req.body;

    // Simple validation
    if (!name || !qty || !price || !mode) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new order
    const newOrder = new OrdersModel({
      name: name,
      qty: Number(qty),
      price: Number(price),
      mode: mode,
    });

    console.log("💾 Saving order...");
    const savedOrder = await newOrder.save();

    console.log("✅ Order saved:", savedOrder);
    res
      .status(200)
      .json({ message: "Order saved successfully!", order: savedOrder });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    res
      .status(500)
      .json({ error: "Failed to save order", details: error.message });
  }
});

// Add sample holdings
app.get("/addHoldings", async (req, res) => {
  const tempHoldings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
  ];

  try {
    await HoldingsModel.insertMany(tempHoldings);
    res.send("Holdings inserted successfully!");
  } catch (err) {
    res.status(500).send("Error inserting holdings: " + err.message);
  }
});

// Add sample positions
app.get("/addPositions", async (req, res) => {
  const tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
  ];

  try {
    for (let item of tempPositions) {
      const newPosition = new PositionsModel(item);
      await newPosition.save();
    }
    res.send("Positions added successfully!");
  } catch (err) {
    res.status(500).send("Error adding positions: " + err.message);
  }
});

app.use("/auth", AuthRoutes);
