import React, { useState, useContext } from "react";
import axios from "axios";
import API_URL from "../config";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const generalContext = useContext(GeneralContext);

  const handleSellClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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
        mode: "SELL",
      };

      const response = await axios.post(`${API_URL}/newOrder`, orderData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("SELL order successful:", response.data);
      alert("Sell order placed successfully!");

      generalContext.closeSellWindow();
    } catch (error) {
      console.error("SELL order failed:", error);

      let errorMessage = "Failed to place SELL order. ";
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
    generalContext.closeSellWindow();
  };

  return (
    <div className="buy-sell-window">
      <div className="window-header sell-header">
        <h3>{uid}</h3>
      </div>

      <div className="window-body">
        <div className="input-row">
          <div className="input-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label>Price</label>
            <input
              type="number"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="window-buttons">
          <button
            className={`action-btn sell-btn ${isLoading ? "loading" : ""}`}
            onClick={handleSellClick}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sell"}
          </button>
          <button
            className="action-btn cancel-btn"
            onClick={handleCancelClick}
            type="button"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
