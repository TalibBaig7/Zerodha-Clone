import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./app";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        {/* WatchList as sidebar on desktop, hidden on mobile */}
        <div className="watchlist-sidebar">
          <WatchList />
        </div>
      </GeneralContextProvider>

      <div className="content">
        <Routes>
          {/* Dashboard/Home shows Summary and WatchList */}
          <Route
            exact
            path="/"
            element={
              <GeneralContextProvider>
                <div className="home-view">
                  <Summary />
                  {/* Mobile WatchList - shows on mobile only */}
                  <div className="mobile-watchlist">
                    <WatchList />
                  </div>
                </div>
              </GeneralContextProvider>
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
