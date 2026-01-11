import React from "react";

function Leftsection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-3 mt-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
          <img 
            src={imageURL} 
            className="p-3 p-md-4 img-fluid" 
            alt={productName}
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div className="col-12 col-md-6 p-3 p-md-5 mt-0 mt-md-5">
          <h1 className="fs-2">{productName}</h1>
          <p>{productDesription}</p>
          <div className="d-flex flex-column flex-sm-row gap-3 mb-3">
            <a href={tryDemo} style={{ textDecoration: "none" }} className="d-inline-flex align-items-center">
              Try Demo
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
            <a href={learnMore} style={{ textDecoration: "none" }} className="d-inline-flex align-items-center">
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
          <div className="mt-3 d-flex flex-column flex-sm-row gap-3">
            <a href={googlePlay}>
              <img 
                src="media\googlePlayBadge.svg" 
                alt="Google Play"
                style={{ maxWidth: "150px" }}
              />
            </a>
            <a href={appStore}>
              <img 
                src="media\appstore-badge.svg" 
                alt="App Store"
                style={{ maxWidth: "150px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftsection;