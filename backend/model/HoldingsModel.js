const mongoose = require("mongoose");

// Define schema for holdings
const HoldingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: { type: String, required: true },
  day: { type: String, required: true },
  isLoss: { type: Boolean, default: false },
});

// Create model from schema
const HoldingsModel = mongoose.model("Holdings", HoldingsSchema);

// Export model
module.exports = { HoldingsModel };
