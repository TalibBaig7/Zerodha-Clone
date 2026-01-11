import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";
import "./master-responsive.css";

const WatchList = () => {
  const [isMobile] = useState(window.innerWidth <= 768);

  const labels = watchlist.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={
            isMobile
              ? "Search stocks..."
              : "Search eg:infy, bse, nifty fut weekly, gold mcx"
          }
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return (
            <WatchListItem stock={stock} key={index} isMobile={isMobile} />
          );
        })}
      </ul>

      <div className="chart-container">
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, isMobile }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    if (!isMobile) {
      setShowWatchlistActions(true);
    }
  };

  const handleMouseLeave = (e) => {
    if (!isMobile) {
      setShowWatchlistActions(false);
    }
  };

  const handleClick = (e) => {
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      return;
    }

    if (isMobile) {
      setShowWatchlistActions(!showWatchlistActions);
    }
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="watchlist-item"
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions uid={stock.name} isMobile={isMobile} />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, isMobile }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = (e) => {
    e.stopPropagation();
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = (e) => {
    e.stopPropagation();
    generalContext.openSellWindow(uid);
  };

  return (
    <div className="actions">
      <div className="action-buttons-simple">
        {isMobile ? (
          <>
            <button className="buy" onClick={handleBuyClick}>
              Buy
            </button>
            <button className="sell" onClick={handleSellClick}>
              Sell
            </button>
          </>
        ) : (
          <>
            <Tooltip
              title="Buy (B)"
              placement="top"
              arrow
              TransitionComponent={Grow}
            >
              <button className="buy" onClick={handleBuyClick}>
                Buy
              </button>
            </Tooltip>
            <Tooltip
              title="Sell (S)"
              placement="top"
              arrow
              TransitionComponent={Grow}
            >
              <button className="sell" onClick={handleSellClick}>
                Sell
              </button>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};
