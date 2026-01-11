const axios = require("axios");

const BASE_URL = "http://localhost:3001";

async function verify() {
  try {
    console.log("1. Checking Server Status...");
    const health = await axios.get(BASE_URL + "/");
    console.log("Server says:", health.data.message);

    const testStock = "INFY_TEST_" + Math.floor(Math.random() * 1000);
    const qty = 5;
    const price = 1500;

    console.log(`2. Placing BUY order for ${testStock}...`);
    const orderRes = await axios.post(BASE_URL + "/newOrder", {
      name: testStock,
      qty: qty,
      price: price,
      mode: "BUY",
    });
    console.log("Order Response:", orderRes.data.message);

    console.log("3. Checking Orders List...");
    const allOrders = await axios.get(BASE_URL + "/allOrders");
    const foundOrder = allOrders.data.find((o) => o.name === testStock);
    if (foundOrder) {
      console.log("✅ Order found in list!");
    } else {
      console.error("❌ Order NOT found in list!");
    }

    console.log("4. Checking Holdings...");
    const allHoldings = await axios.get(BASE_URL + "/allHoldings");
    const foundHolding = allHoldings.data.find((h) => h.name === testStock);
    if (foundHolding) {
      console.log(`✅ Holding found: ${foundHolding.name}, Qty: ${foundHolding.qty}`);
      if (foundHolding.qty === qty) {
        console.log("✅ Quantity matches!");
      } else {
        console.error("❌ Quantity mismatch!");
      }
    } else {
      console.error("❌ Holding NOT found for the new order!");
    }

  } catch (error) {
    console.error("Verification failed:", error.message);
    if (error.response) console.error("Data:", error.response.data);
  }
}

verify();
