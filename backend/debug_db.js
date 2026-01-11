require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

console.log("Testing connection to:", uri.replace(/:([^:@]+)@/, ":****@")); // Mask password

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connection Successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Failed:");
    console.error("Code:", err.code);
    console.error("CodeName:", err.codeName);
    console.error("Message:", err.message);
    process.exit(1);
  });
