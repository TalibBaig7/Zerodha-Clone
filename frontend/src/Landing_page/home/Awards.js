import React from "react";

function Awards() {
  return (
    <div className="container mt-3 mt-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
          <img src="media\largestBroker.svg" style={{ width: "100%", maxWidth: "400px" }} alt="Largest Broker" />
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-5 px-4">
          <h1 className="fs-2">Largest stock broker in India</h1>
          <p className="mb-4 mb-md-5">
            2+ million Zerodha clients contribute to over 15% all retail order
            volumes in India daily by trading and investing in:
          </p>
          <div className="row mb-4 mb-md-5">
            <div className="col-12 col-sm-6 p-3 p-md-5">
              <ul>
                <li>Features and Options</li>
                <li>Commodities and derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-12 col-sm-6 p-3 p-md-5">
              <ul>
                <li>Stocks & IPO'S</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. securities</li>
              </ul>
            </div>
          </div>
          <img src="media\pressLogos.png" style={{ width: "100%", maxWidth: "500px" }} alt="Press Logos" />
        </div>
      </div>
    </div>
  );
}

export default Awards;