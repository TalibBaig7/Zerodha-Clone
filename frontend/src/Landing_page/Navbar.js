import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img src="media/logo.svg" style={{ width: "25%" }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/signup">
                SignUp
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/product">
                Product
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/pricing">
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
