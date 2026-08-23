import React, { useState, useEffect, useCallback } from "react";
import { api } from "../config";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("checking"); // checking | authorized | unauthorized | unreachable
  const [slowLoading, setSlowLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    setStatus("checking");
    setSlowLoading(false);
    const slowTimer = setTimeout(() => setSlowLoading(true), 6000);

    console.log("Checking auth against API:", api.defaults.baseURL);
    try {
      const response = await api.get("/api/me");

      if (response.data.message === "Authorized") {
        setStatus("authorized");
      } else {
        console.warn("Auth check returned unauthorized:", response.data);
        setStatus("unauthorized");
      }
    } catch (error) {
      console.error("Auth check failed against:", api.defaults.baseURL, error);

      // A real 401/403 from the server means the user genuinely isn't
      // logged in — send them to the login page.
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setStatus("unauthorized");
        return;
      }

      // Anything else (timeout, no response, 5xx while the free-tier
      // backend is still waking up) is a connectivity problem, NOT proof
      // the user is logged out. Previously this incorrectly redirected to
      // login on every network hiccup — show a retry screen instead so a
      // real user session isn't dropped just because the server was slow.
      setStatus("unreachable");
    } finally {
      clearTimeout(slowTimer);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (status === "unauthorized") {
      window.location.href =
        (process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000") + "/login";
    }
  }, [status]);

  if (status === "checking") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          textAlign: "center",
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
        <p style={{ color: "#666", fontSize: "16px" }}>
          {slowLoading
            ? "Still checking — the server may be waking up from sleep (this can take up to a minute)..."
            : "Checking authentication..."}
        </p>
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

  if (status === "unreachable") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "16px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#333", fontSize: "16px", maxWidth: "360px" }}>
          Couldn't reach the server. It may be waking up from sleep, or your connection may have
          dropped.
        </p>
        <button
          onClick={checkAuth}
          style={{
            padding: "10px 24px",
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "unauthorized") {
    return null; // Will redirect in the effect above
  }

  return <>{children}</>;
};

export default ProtectedRoute;
