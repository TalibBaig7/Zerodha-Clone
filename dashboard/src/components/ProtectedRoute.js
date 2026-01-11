import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/me`, {
          withCredentials: true,
        });

        if (response.data.message === "Authorized") {
          setIsAuthenticated(true);
        } else {
          redirectToLogin();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        redirectToLogin();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const redirectToLogin = () => {
    // Redirect to frontend login page
    window.location.href = (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/login";
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #4184f3",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ color: "#666", fontSize: "16px" }}>Checking authentication...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
