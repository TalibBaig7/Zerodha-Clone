import React from "react";

function Rightsection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-3 mt-md-5">
      <div className="row align-items-center flex-column-reverse flex-md-row">
        {/* Left Content */}
        <div className="col-12 col-md-6 p-3 p-md-5 mt-3 mt-md-5">
          <h1 className="fs-2">{productName}</h1>
          <p>{productDesription}</p>

          {/* Learn More Link */}
          <div>
            <a 
              href={learnMore} 
              style={{ textDecoration: "none" }}
              className="d-inline-flex align-items-center"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ms-1"
              >
                <path d="M18 8L22 12L18 16" />
                <path d="M2 12H22" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img 
            src={imageURL} 
            className="p-3 p-md-4 img-fluid" 
            alt={productName || "Product"}
            style={{ maxWidth: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Rightsection;