import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-3 mt-md-5">
        <h1 className="text-center mt-3 mt-md-5 border-top pt-4">People</h1>
      </div>
      <div
        className="row p-3 p-md-5 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1em" }}
      >
        <div className="col-12 col-md-6 p-3 text-center mb-4 mb-md-0">
          <img
            src="media\nithinKamath.jpg"
            style={{ borderRadius: "100%", width: "60%", maxWidth: "250px" }}
            alt="Nithin Kamath"
          />
          <h5 className="mt-4 mt-md-5">Nithin Kamath</h5>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-12 col-md-6 p-3">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              Homepage / TradingQnA / Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;