import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-3 p-md-5 mt-3 mt-md-5 mb-3 mb-md-5">
        <h1 className="mb-4">To create a ticket, select a relevant topic</h1>

        {/* Account Opening */}
        <div className="col-12 col-md-6 col-lg-4 p-3 p-md-5 mt-3 mt-md-5 text-center border-top">
          <h4 className="mb-4">
            <img
              src="media\icons8-plus.svg"
              alt="Plus icon"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Account Opening
          </h4>
          <div className="d-flex flex-column gap-2">
            <a href="/" style={{ textDecoration: "none" }}>
              Online Account Opening
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Offline Account Opening
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Company, Partnership and HUF Account Opening
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              NRI Account Opening
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Charges at Zerodha
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Zerodha IDFC FIRST Bank 3-in-1 Account
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Getting Started
            </a>
          </div>
        </div>

        {/* Your Zerodha Account */}
        <div className="col-12 col-md-6 col-lg-4 p-3 p-md-5 mt-3 mt-md-5 text-center border-top">
          <h4 className="mb-4">
            <img
              src="media\user-icon_10938.png"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
              alt="User icon"
            />
            Your Zerodha Account
          </h4>
          <div className="d-flex flex-column gap-2">
            <a href="/" style={{ textDecoration: "none" }}>
              Login credentials
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Your Profile
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Account modification and segment addition
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              CMR & DP ID
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Nomination
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Transfer and conversion of shares
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              IDFC FIRST Bank 3-in-1 Account
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Account closure
            </a>
          </div>
        </div>

        {/* Trading and Markets */}
        <div className="col-12 col-md-6 col-lg-4 p-3 p-md-5 mt-3 mt-md-5 text-center border-top">
          <h4 className="mb-4">
            <img
              src="media\bar-chart_254295.png"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
              alt="Chart icon"
            />
            Trading and Markets
          </h4>
          <div className="d-flex flex-column gap-2">
            <a href="/" style={{ textDecoration: "none" }}>
              Trading FAQs
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Kite
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Margins
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Product and order types
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Corporate actions
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Kite features
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Trading platforms
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              Market data
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
