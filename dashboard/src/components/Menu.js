import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./master-responsive.css";

const Menu = ({ isMobile, mobileMenuOpen, toggleMobileMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuScrollRef = useRef(null);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    if (isMobile && toggleMobileMenu) {
      // Close mobile menu after selection
      setTimeout(() => toggleMobileMenu(), 150);
    }
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // Redirect to frontend login page
      window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if logout API call fails
      window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/login";
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const menuItems = [
    { name: "Dashboard", path: "/", index: 0 },
    { name: "Orders", path: "/orders", index: 1 },
    { name: "Holdings", path: "/holdings", index: 2 },
    { name: "Positions", path: "/positions", index: 3 },
    { name: "Funds", path: "/funds", index: 4 },
    { name: "Apps", path: "/apps", index: 6 },
  ];

  return (
    <div className="menu-container">
      {isMobile && (
        <>
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "transparent",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "var(--bg-light)")
            }
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            <MenuIcon style={{ fontSize: "24px", color: "var(--text-dark)" }} />
          </button>
          <img src="images.png" style={{ width: "35px" }} alt="Logo" />
        </>
      )}

      {!isMobile && (
        <img src="images.png" style={{ width: "50px" }} alt="Logo" />
      )}

      <div className="menus" ref={menuScrollRef}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.index}>
              <Link
                style={{ textDecoration: "none" }}
                to={item.path}
                onClick={() => handleMenuClick(item.index)}
              >
                <p
                  className={
                    selectedMenu === item.index ? activeMenuClass : menuClass
                  }
                >
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        {!isMobile && <hr />}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">ZU</div>
            {!isMobile && <p className="username">USERID</p>}
          </div>
          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                marginTop: "8px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                minWidth: "150px",
                zIndex: 1000,
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  color: "#ef4444",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#fef2f2";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
