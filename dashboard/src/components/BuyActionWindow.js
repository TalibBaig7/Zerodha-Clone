import React, { useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyClick = async (e) => {
    // Prevent any default behavior
    e.preventDefault();
    e.stopPropagation();

    console.log("Buy button clicked!");

    // Validation
    if (!uid) {
      alert("Error: Stock symbol is required!");
      return;
    }

    if (!stockQuantity || stockQuantity <= 0) {
      alert("Error: Please enter a valid quantity!");
      return;
    }

    if (!stockPrice || stockPrice <= 0) {
      alert("Error: Please enter a valid price!");
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      };

      console.log("Sending order:", orderData);

      const response = await axios.post(
        "https://zerodha-clone-backend-ax9w.onrender.com/newOrder",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("Order successful:", response.data);
      alert("Order placed successfully!");

      // Close the buy window
      if (
        GeneralContext &&
        typeof GeneralContext.closeBuyWindow === "function"
      ) {
        GeneralContext.closeBuyWindow();
      }
    } catch (error) {
      console.error("Order failed:", error);

      let errorMessage = "Failed to place order. ";
      if (error.response) {
        errorMessage += `Server error: ${
          error.response.data?.error || error.response.statusText
        }`;
      } else if (error.request) {
        errorMessage += "No response from server. Check if backend is running.";
      } else {
        errorMessage += error.message;
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (GeneralContext && typeof GeneralContext.closeBuyWindow === "function") {
      GeneralContext.closeBuyWindow();
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              disabled={isLoading}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              disabled={isLoading}
            />
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            className={`btn btn-blue ${isLoading ? "loading" : ""}`}
            onClick={handleBuyClick}
            type="button"
            disabled={isLoading}
            style={{
              pointerEvents: "auto",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Processing..." : "Buy"}
          </button>
          <button
            className="btn btn-grey"
            onClick={handleCancelClick}
            type="button"
            disabled={isLoading}
            style={{ pointerEvents: "auto", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
