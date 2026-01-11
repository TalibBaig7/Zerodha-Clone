import React from "react";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center p-3 p-md-5 mb-3 mb-md-5">
        <h1 className="mb-3">The Zerodha Universe</h1>
        <p className="mb-4">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        
        <div className="col-12 col-sm-6 col-md-4 p-3">
          <img
            src="media\zerodhaFundhouse.png"
            style={{ width: "150px", maxWidth: "100%" }}
            alt="Zerodha Fundhouse"
            className="mb-3"
          />
          <p className="text-muted">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        
        <div className="col-12 col-sm-6 col-md-4 p-3">
          <img
            src="media\sensibullLogo.svg"
            alt="Sensibull"
            style={{ width: "150px", maxWidth: "100%" }}
            className="mb-3"
          />
          <p className="text-muted">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        
        <div className="col-12 col-sm-6 col-md-4 p-3">
          <img 
            src="media\tijori.svg" 
            style={{ width: "150px", maxWidth: "100%" }} 
            alt="Tijori"
            className="mb-3"
          />
          <p className="text-muted">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-0 mt-md-4">
          <img
            src="media\streakLogo.png"
            style={{ width: "150px", maxWidth: "100%" }}
            alt="Streak"
            className="mb-3"
          />
          <p className="text-muted">
            Systematic trading platform that lets you create, backtest, and
            deploy trading strategies without any coding.
          </p>
        </div>
        
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-0 mt-md-4">
          <img
            src="media\smallcaseLogo.png"
            alt="Smallcase"
            style={{ width: "150px", maxWidth: "100%" }}
            className="mb-3"
          />
          <p className="text-muted">
            Thematic investment platform that helps you invest in diversified
            basket of stocks on ETFs.
          </p>
        </div>
        
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-0 mt-md-4">
          <img
            src="media\dittoLogo.png"
            style={{ width: "150px", maxWidth: "100%" }}
            alt="Ditto"
            className="mb-3"
          />
          <p className="text-muted">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
        
        <button
          className="p-3 btn btn-primary fs-5 mb-4 mb-md-5 mt-4"
          style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
        >
          Sign Up for Free
        </button>
      </div>
    </div>
  );
}

export default Universe;
