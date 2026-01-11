import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-3 p-md-5">
        <div className="col-12 col-md-6 p-3 p-md-5 mb-4 mb-md-0">
          <h1 className="fs-1 mb-4 mb-md-5">Trust with confidence</h1>

          <h2 className="fs-5 mt-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores worth of equity investments.
          </p>

          <h2 className="fs-5 mt-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.
          </p>

          <h2 className="fs-5 mt-4">The Zerodha universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
          </p>

          <h2 className="fs-5 mt-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
          </p>
        </div>

        <div className="col-12 col-md-6 text-center">
          <img
            src="media/ecosystem.png"
            alt="Ecosystem"
            style={{ width: "100%", maxWidth: "500px" }}
            className="mb-4"
          />
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
            <a href="/" className="d-inline-flex align-items-center" style={{ textDecoration: "none" }}>
              Explore our products
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
            <a href="/" className="d-inline-flex align-items-center" style={{ textDecoration: "none" }}>
              Try kite demo
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
        </div>
      </div>
    </div>
  );
}

export default Stats;