import React, { useState, useEffect } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  // BUY FUNCTIONS
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},

  // SELL FUNCTIONS
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  // BUY STATE
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  // SELL STATE
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

  // BUY FUNCTIONS
  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    // Close sell window if open
    setIsSellWindowOpen(false);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  // SELL FUNCTIONS
  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
    // Close buy window if open
    setIsBuyWindowOpen(false);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (isBuyWindowOpen) {
        handleCloseBuyWindow();
      }
      if (isSellWindowOpen) {
        handleCloseSellWindow();
      }
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isBuyWindowOpen || isSellWindowOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isBuyWindowOpen, isSellWindowOpen]);

  return (
    <GeneralContext.Provider
      value={{
        // BUY FUNCTIONS
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,

        // SELL FUNCTIONS
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}

      {/* BACKDROP AND BUY WINDOW */}
      {isBuyWindowOpen && (
        <div 
          className="order-window-backdrop" 
          onClick={handleBackdropClick}
        >
          <BuyActionWindow uid={selectedStockUID} />
        </div>
      )}

      {/* BACKDROP AND SELL WINDOW */}
      {isSellWindowOpen && (
        <div 
          className="order-window-backdrop" 
          onClick={handleBackdropClick}
        >
          <SellActionWindow uid={selectedStockUID} />
        </div>
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;