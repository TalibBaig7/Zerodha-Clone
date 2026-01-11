const BASE_URL = "http://localhost:3001";

async function verify() {
  try {
    console.log("1. Placing BUY order for VERIFY_FETCH...");
    const response = await fetch(BASE_URL + "/newOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "VERIFY_FETCH",
        qty: 10,
        price: 750.50,
        mode: "BUY",
      }),
    });
    
    const orderData = await response.json();
    console.log("Order Response:", orderData.message);

    console.log("2. Checking Holdings...");
    const holdingsRes = await fetch(BASE_URL + "/allHoldings");
    const holdings = await holdingsRes.json();
    
    const found = holdings.find(h => h.name === "VERIFY_FETCH");
    
    if (found) {
        console.log("✅ Success! Found holding:", found);
    } else {
        console.log("❌ Failure! Holding not found. Current holdings:", holdings);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

verify();
