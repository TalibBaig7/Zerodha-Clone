import React, { useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css"; // Reuse the same CSS

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const handleSellClick = async (e) => {
    // Prevent any default behavior
    e.preventDefault();
    e.stopPropagation();

    console.log("Sell button clicked!");
    
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
      // IMPORTANT: Notice mode is "SELL" instead of "BUY"
      const orderData = {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL", // THIS IS THE KEY DIFFERENCE
      };

      console.log("Sending SELL order:", orderData);

      const response = await axios.post("http://localhost:3002/newOrder", orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log("SELL order successful:", response.data);
      alert("SELL order placed successfully!");
      
      // Close the sell window
      if (GeneralContext && typeof GeneralContext.closeSellWindow === 'function') {
        GeneralContext.closeSellWindow();
      } else if (GeneralContext && typeof GeneralContext.closeBuyWindow === 'function') {
        // Fallback if you're using the same close function
        GeneralContext.closeBuyWindow();
      }

    } catch (error) {
      console.error("SELL order failed:", error);
      
      let errorMessage = "Failed to place SELL order. ";
      if (error.response) {
        errorMessage += `Server error: ${error.response.data?.error || error.response.statusText}`;
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
    
    if (GeneralContext && typeof GeneralContext.closeSellWindow === 'function') {
      GeneralContext.closeSellWindow();
    } else if (GeneralContext && typeof GeneralContext.closeBuyWindow === 'function') {
      // Fallback if you're using the same close function
      GeneralContext.closeBuyWindow();
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">
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
            className={`btn btn-red ${isLoading ? 'loading' : ''}`} // Changed to red for sell
            onClick={handleSellClick}
            type="button"
            disabled={isLoading}
            style={{ 
              pointerEvents: 'auto', 
              cursor: isLoading ? 'not-allowed' : 'pointer',
              backgroundColor: '#e53e3e' // Red color for sell button
            }}
          >
            {isLoading ? 'Processing...' : 'Sell'}
          </button>
          <button 
            className="btn btn-grey"
            onClick={handleCancelClick}
            type="button"
            disabled={isLoading}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;