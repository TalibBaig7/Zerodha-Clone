import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow"; // NEW IMPORT

const GeneralContext = React.createContext({
  // EXISTING BUY FUNCTIONS
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},

  // NEW SELL FUNCTIONS
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  // EXISTING BUY STATE
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  // NEW SELL STATE
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

  // EXISTING BUY FUNCTIONS
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

  // NEW SELL FUNCTIONS
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

  return (
    <GeneralContext.Provider
      value={{
        // EXISTING BUY FUNCTIONS
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,

        // NEW SELL FUNCTIONS
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}

      {/* EXISTING BUY WINDOW */}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}

      {/* NEW SELL WINDOW */}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
