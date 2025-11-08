function Universe() {
  return (
    <div className="container">
      <div className="row text-center p-5 mb-5">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3">
          <img
            src="media\zerodhaFundhouse.png"
            style={{ width: "150px" }}
            alt="Smallcase"
          />
          <p>
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            src="media\sensibullLogo.svg"
            alt="Sensibull"
            style={{ width: "150px" }}
          />
          <p className="fs-6">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-3">
          <img src="media\tijori.svg" style={{ width: "150px" }} alt="Streak" />
          <p>
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src="media\streakLogo.png"
            style={{ width: "150px" }}
            alt="Smallcase"
          />
          <p>
            Systeamatic trading platform that lets you create, backtest, and
            deploy trading strategies without any coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src="media\smallcaseLogo.png"
            alt="Sensibull"
            style={{ width: "150px" }}
          />
          <p className="fs-6">
            Thematic investment platform that helps you invest in diversified
            basket of stocks on EFTs.
          </p>
        </div>
        <div className="col-4 p-3 mt-4">
          <img
            src="media\dittoLogo.png"
            style={{ width: "150px" }}
            alt="Streak"
          />
          <p>
            Personalized advice on life and health insurance.No spam and no
            mis-selling.
          </p>
        </div>
        <button
          className="p-3 btn btn-primary fs-5 mb-5"
          style={{ width: "30%", margin: "0 auto" }}
        >
          Sign Up for Free
        </button>
      </div>
    </div>
  );
}

export default Universe;
