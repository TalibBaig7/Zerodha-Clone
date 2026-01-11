import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(240, 240, 240)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5 g-4">
          <div className="col-12 col-md-6 col-lg-2">
            <img src="media/logo.svg" style={{ width: "50%", maxWidth: "150px" }} alt="Logo" />
            <p className="mt-3">© 2010 - 2025, Zerodha Broking Ltd. All rights reserved.</p>
          </div>
          <div className="col-6 col-md-6 col-lg-2">
            <p className="fw-bold">Account</p>
            <a href="/" className="d-block mb-2">Open an account</a>
            <a href="/" className="d-block mb-2">Minor demat account</a>
            <a href="/" className="d-block mb-2">NRI demat account</a>
            <a href="/" className="d-block mb-2">Commodity</a>
            <a href="/" className="d-block mb-2">Dematerialisation</a>
            <a href="/" className="d-block mb-2">Fund transfer</a>
            <a href="/" className="d-block mb-2">MTF</a>
            <a href="/" className="d-block mb-2">Referral program</a>
          </div>
          <div className="col-6 col-md-6 col-lg-2">
            <p className="fw-bold">Support</p>
            <a href="/" className="d-block mb-2">Contact us</a>
            <a href="/" className="d-block mb-2">Support portal</a>
            <a href="/" className="d-block mb-2">How to file a complaint?</a>
            <a href="/" className="d-block mb-2">Status of your complaints</a>
            <a href="/" className="d-block mb-2">Bulletin</a>
            <a href="/" className="d-block mb-2">Circular</a>
            <a href="/" className="d-block mb-2">Z-Connect blog</a>
            <a href="/" className="d-block mb-2">Downloads</a>
          </div>
          <div className="col-6 col-md-6 col-lg-2">
            <p className="fw-bold">Company</p>
            <a href="/" className="d-block mb-2">About</a>
            <a href="/" className="d-block mb-2">Philosophy</a>
            <a href="/" className="d-block mb-2">Press & media</a>
            <a href="/" className="d-block mb-2">Careers</a>
            <a href="/" className="d-block mb-2">Zerodha Cares (CSR)</a>
            <a href="/" className="d-block mb-2">Zerodha.tech</a>
            <a href="/" className="d-block mb-2">Open source</a>
          </div>
          <div className="col-6 col-md-6 col-lg-2">
            <p className="fw-bold">Quick Links</p>
            <a href="/" className="d-block mb-2">Upcoming IPOs</a>
            <a href="/" className="d-block mb-2">Brokerage charges</a>
            <a href="/" className="d-block mb-2">Market holidays</a>
            <a href="/" className="d-block mb-2">Economic calendar</a>
            <a href="/" className="d-block mb-2">Calculators</a>
            <a href="/" className="d-block mb-2">Markets</a>
            <a href="/" className="d-block mb-2">Sectors</a>
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "0.8rem" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration
            no.: INZ000031633. CDSL/NSDL: Depository services through Zerodha
            Broking Ltd. – SEBI Registration no.: IN-DP-431-2019. Commodity
            Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; SEBI
            Registration no.: INZ000038238. Registered Address: Zerodha Broking
            Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public
            School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
            For any complaints pertaining to securities broking please write to{" "}
            <a href="mailto:complaints@zerodha.com">complaints@zerodha.com</a>,
            for DP related to <a href="mailto:dp@zerodha.com">dp@zerodha.com</a>
            . Please ensure you carefully read the Risk Disclosure Document as
            prescribed by SEBI | ICF
          </p>

          <p>
            <strong>Procedure to file a complaint on SEBI SCORES:</strong>{" "}
            Register on SCORES portal. Mandatory details for filing complaints
            on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits:
            Effective Communication, Speedy redressal of the grievances
          </p>

          <p>
            Smart Online Dispute Resolution | Grievances Redressal Mechanism
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            <strong>Attention investors:</strong>
            1) Stock brokers can accept securities as margins from clients only
            by way of pledge in the depository system w.e.f September 01, 2020.
            2) Update your e-mail and phone number with your stock broker /
            depository participant and receive OTP directly from depository on
            your e-mail and/or mobile number to create pledge. 3) Check your
            securities / MF / bonds in the consolidated account statement issued
            by NSDL/CDSL every month.
          </p>

          <p>
            India's largest broker based on networth as per NSE.{" "}
            <a href="/">NSE broker factsheet</a>
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary."
          </p>

          <p>
            Dear Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please{" "}
            <a href="/">create a ticket here</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;