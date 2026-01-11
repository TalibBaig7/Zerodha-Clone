import React from "react";

function Education() {
  return (
    <div className="container p-3 p-md-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
          <img
            src="media\education.svg"
            alt="Education"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-5 px-3 px-md-4">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <div className="mb-4">
            <a href="/" className="d-inline-block" style={{ textDecoration: "none" }}>
              Varsity →
            </a>
          </div>
          <p className="mt-4 mt-md-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <div>
            <a href="/" className="d-inline-block" style={{ textDecoration: "none" }}>
              TradingQ&A →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
