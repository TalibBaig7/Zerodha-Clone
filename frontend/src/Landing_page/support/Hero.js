import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="support-hero">
      <div className="p-3 p-md-4 d-flex justify-content-between align-items-center flex-wrap" id="supportWrapper">
        <h4 className="mb-2 mb-md-0">Support Portal</h4>
        <a href="/">Track Tickets</a>
      </div>
      <div className="row p-3 p-md-5 m-0 m-md-3">
        <div className="col-12 col-md-6 p-3 p-md-5 mb-4 mb-md-0">
          <h1 className="fs-4 fs-md-3 mb-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            placeholder="Eg. how do I activate F&O"
            className="form-control mb-3"
            style={{ padding: "10px" }}
          />
          <div className="d-flex flex-wrap gap-2">
            <a href="/" className="text-decoration-none">Track account opening</a>
            <a href="/" className="text-decoration-none">Track segment activation</a>
            <a href="/" className="text-decoration-none">Intraday margins</a>
            <a href="/" className="text-decoration-none">Kite user manual</a>
          </div>
        </div>
        <div className="col-12 col-md-6 p-3 p-md-5">
          <h1 className="fs-4 fs-md-3 mb-3">Featured</h1>
          <ol className="ps-3">
            <li className="mb-2">
              <a href="/">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="/">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;