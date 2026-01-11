import React from "react";

function OpenAccount() {
  return (
    <div className="container p-4 p-md-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-3 mt-md-5">Open a Zerodha account</h1>
        <p className="px-3">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
        </p>
        <button
          className="p-3 btn btn-primary fs-5 mb-5"
          style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
        >
          Sign Up for Free
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;
