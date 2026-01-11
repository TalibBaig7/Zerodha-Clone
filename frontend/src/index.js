import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./Landing_page/home/Homepage";
import Signup from "./Landing_page/signup/Signup";
import Login from "./Landing_page/login/Login";
import Aboutpage from "./Landing_page/About/Aboutpage";
import Productpage from "./Landing_page/Products/Productpage";
import Supportpage from "./Landing_page/support/Supportpage";
import Pricingpage from "./Landing_page/Pricing/Pricingpage";
import Footer from "./Landing_page/Footer";
import Navbar from "./Landing_page/Navbar";
import NotFound from "./Landing_page/NotFound";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/product" element={<Productpage />} />
      <Route path="/pricing" element={<Pricingpage />} />
      <Route path="/support" element={<Supportpage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
