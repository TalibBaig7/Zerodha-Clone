import React from "react";

function Pricing() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-4">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India.Flat fees and no hidden charges.
          </p>
          <a href="" className="mx-5" style={{ textDecoration: "none" }}>
            See Pricing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-move-right-icon lucide-move-right"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </a>
        </div>

        <div className="col-2"></div>
        <div className="col-6">
          <div className="row text-center">
            <div className="col border p-3">
              <span>
                <img src="media\pricing0.svg" className="mb-2" />
                <p>Free account opening</p>
              </span>
            </div>
            <div className="col border p-3">
              <span>
                <img src="media\pricing0.svg" className="mb-2" />
                <p>Free equity delivery and direct mutual funds</p>
              </span>
            </div>
            <div className="col border p-3">
              <span>
                <img src="media\other-trades.svg" className="mb-2" />
                <p>Intraday and F&O</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
