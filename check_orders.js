require("dotenv").config({ path: "./backend/.env" });
const mongoose = require("mongoose");
const { OrdersModel } = require("./backend/model/OrdersModel");

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to DB");
    const orders = await OrdersModel.find({});
    console.log("Orders found:", orders.length);
    console.log(JSON.stringify(orders, null, 2));
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
