import React from "react";

function Pricing() {
  return (
    <div className="container mb-3 mb-md-5 p-3">
      <div className="row">
        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="/" className="d-inline-flex align-items-center" style={{ textDecoration: "none" }}>
            See Pricing
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
              className="ms-2"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </a>
        </div>

        <div className="col-12 col-lg-8">
          <div className="row text-center g-0">
            <div className="col-12 col-sm-4 border p-3">
              <span>
                <img src="media\pricing0.svg" className="mb-2" style={{ maxWidth: "60px" }} alt="Free" />
                <p className="mb-0">Free account opening</p>
              </span>
            </div>
            <div className="col-12 col-sm-4 border p-3">
              <span>
                <img src="media\pricing0.svg" className="mb-2" style={{ maxWidth: "60px" }} alt="Free" />
                <p className="mb-0">Free equity delivery and direct mutual funds</p>
              </span>
            </div>
            <div className="col-12 col-sm-4 border p-3">
              <span>
                <img src="media\other-trades.svg" className="mb-2" style={{ maxWidth: "60px" }} alt="Trades" />
                <p className="mb-0">Intraday and F&O</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;