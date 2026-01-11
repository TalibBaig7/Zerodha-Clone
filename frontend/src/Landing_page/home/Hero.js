import React from "react";

function Hero() {
  return (
    <div className="container p-3 p-md-5 mb-3 mb-md-5">
      <div className="row text-center">
        <img
          src="media/homeHero.png"
          alt="Hero"
          className="mb-4 mb-md-5 img-fluid"
          style={{ maxWidth: "100%" }}
        />
        <h1 className="mt-3 mt-md-5 fs-1">Invest in everything</h1>
        <p className="px-3">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>
        <button
          className="p-3 btn btn-primary fs-5 mb-4 mb-md-5"
          style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
        >
          Sign Up for Free
        </button>
      </div>
    </div>
  );
}

export default Hero;