import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-3 mb-md-5">
      <div className="text-center mt-3 mt-md-5 p-3">
        <h1>Zerodha Products</h1>
        <h3 className="text-muted mt-3 fs-4 fs-md-3">
          Sleek, modern, and intuitive trading platforms
        </h3>
        <p className="mt-3 mb-4 mb-md-5">
          Check out our{" "}
          <a href="/" style={{ textDecoration: "none" }} className="d-inline-flex align-items-center">
            investment offerings
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ms-1"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;