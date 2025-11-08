import React from "react";

function Rightsection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Content */}
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>

          {/* Learn More Link */}
          <div>
            <a href={learnMore}>
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-right-icon lucide-move-right"
              >
                <path d="M18 8L22 12L18 16" />
                <path d="M2 12H22" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="col-6">
          <img src={imageURL} className="p-4" alt={productName || "Product"} />
        </div>
      </div>
    </div>
  );
}

export default Rightsection;
