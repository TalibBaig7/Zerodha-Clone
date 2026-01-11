import React, { useState, useContext } from "react";
import axios from "axios";
import API_URL from "../config";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const generalContext = useContext(GeneralContext);

  const handleBuyClick = async (e) => {
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
        mode: "BUY",
      };

      const response = await axios.post(`${API_URL}/newOrder`, orderData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Order successful:", response.data);
      alert("Buy order placed successfully!");

      generalContext.closeBuyWindow();
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
    generalContext.closeBuyWindow();
  };

  return (
    <div className="buy-sell-window">
      <div className="window-header buy-header">
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
            className={`action-btn buy-btn ${isLoading ? "loading" : ""}`}
            onClick={handleBuyClick}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy"}
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

export default BuyActionWindow;
