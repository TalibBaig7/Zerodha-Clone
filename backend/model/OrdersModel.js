const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const OrdersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mode: {
      type: String,
      required: true,
      enum: ["BUY", "SELL"],
      uppercase: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

const OrdersModel = mongoose.model("order", OrdersSchema);

module.exports = { OrdersModel };
