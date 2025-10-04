import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
        <div className="text-center mt-5 p-3">

      <h1>Zerodha Products</h1>
      <h3 className="text-muted mt-3 fs-3">Sleek, modern, and intuitive trading platforms</h3>
      <p className="mt-3 mb-5">
        Check out our{" "}
        <a href="" style={{ textDecoration: "none" }}>
          investment offerings
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-move-right-icon lucide-move-right"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </a>
      </p>
        </div>
    </div>
  );
}

export default Hero;
