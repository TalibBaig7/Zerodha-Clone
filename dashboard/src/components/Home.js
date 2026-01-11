import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import ProtectedRoute from "./ProtectedRoute";
import "./master-responsive.css";

const Home = () => {
  return (
    <ProtectedRoute>
      <div className="home-container">
        <TopBar />
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
};

export default Home;