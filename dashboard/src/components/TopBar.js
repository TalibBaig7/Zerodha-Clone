import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import "./master-responsive.css";

const TopBar = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsMenuOpen(false); // Close menu after selection on mobile
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/login";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/login";
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <>
      <div className="topbar-container">
        {/* Mobile Hamburger Icon */}
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <Close /> : <MenuIcon />}
        </button>

        {/* Logo */}
        <div className="logo-container">
          <img src="images.png" style={{ width: "40px" }} alt="Logo" />
        </div>

        {/* Desktop Indices */}
        <div className="indices-container">
          <div className="nifty">
            <p className="index">NIFTY 50</p>
            <p className="index-points">{100.2}</p>
            <p className="percent">+0.5%</p>
          </div>
          <div className="sensex">
            <p className="index">SENSEX</p>
            <p className="index-points">{100.2}</p>
            <p className="percent">+0.3%</p>
          </div>
        </div>

        {/* Desktop Navigation - WITH DASHBOARD */}
        <nav className="desktop-nav">
          <ul>
            <li>
              <Link to="/" onClick={() => handleMenuClick(0)}>
                <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                  Dashboard
                </p>
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={() => handleMenuClick(1)}>
                <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                  Orders
                </p>
              </Link>
            </li>
            <li>
              <Link to="/holdings" onClick={() => handleMenuClick(2)}>
                <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                  Holdings
                </p>
              </Link>
            </li>
            <li>
              <Link to="/positions" onClick={() => handleMenuClick(3)}>
                <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                  Positions
                </p>
              </Link>
            </li>
            <li>
              <Link to="/funds" onClick={() => handleMenuClick(4)}>
                <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                  Funds
                </p>
              </Link>
            </li>
            <li>
              <Link to="/apps" onClick={() => handleMenuClick(5)}>
                <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                  Apps
                </p>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile */}
        <div className="profile-container">
          <div
            className="profile"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="avatar">ZU</div>
            <p className="username">USERID</p>
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay - WITH DASHBOARD */}
      {isMenuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="mobile-menu">
            {/* Mobile Indices */}
            <div className="mobile-indices">
              <div className="nifty">
                <p className="index">NIFTY 50</p>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <p className="index-points">{100.2}</p>
                  <p className="percent">+0.5%</p>
                </div>
              </div>
              <div className="sensex">
                <p className="index">SENSEX</p>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <p className="index-points">{100.2}</p>
                  <p className="percent">+0.3%</p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links - WITH DASHBOARD */}
            <nav className="mobile-nav-links">
              <Link to="/" onClick={() => handleMenuClick(0)}>
                <div
                  className={
                    selectedMenu === 0
                      ? "mobile-menu-item active"
                      : "mobile-menu-item"
                  }
                >
                  Dashboard
                </div>
              </Link>
              <Link to="/orders" onClick={() => handleMenuClick(1)}>
                <div
                  className={
                    selectedMenu === 1
                      ? "mobile-menu-item active"
                      : "mobile-menu-item"
                  }
                >
                  Orders
                </div>
              </Link>
              <Link to="/holdings" onClick={() => handleMenuClick(2)}>
                <div
                  className={
                    selectedMenu === 2
                      ? "mobile-menu-item active"
                      : "mobile-menu-item"
                  }
                >
                  Holdings
                </div>
              </Link>
              <Link to="/positions" onClick={() => handleMenuClick(3)}>
                <div
                  className={
                    selectedMenu === 3
                      ? "mobile-menu-item active"
                      : "mobile-menu-item"
                  }
                >
                  Positions
                </div>
              </Link>
              <Link to="/funds" onClick={() => handleMenuClick(4)}>
                <div
                  className={
                    selectedMenu === 4
                      ? "mobile-menu-item active"
                      : "mobile-menu-item"
                  }
                >
                  Funds
                </div>
              </Link>
              <Link to="/apps" onClick={() => handleMenuClick(5)}>
                <div
                  className={
                    selectedMenu === 5
                      ? "mobile-menu-item active"
                      : "mobile-menu-item"
                  }
                >
                  Apps
                </div>
              </Link>
            </nav>

            {/* Mobile Logout */}
            <div className="mobile-menu-footer">
              <button onClick={handleLogout} className="mobile-logout-btn">
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopBar;
