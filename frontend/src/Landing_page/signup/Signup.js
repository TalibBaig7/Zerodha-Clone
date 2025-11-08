import React, { useState } from "react";
import axios from "axios";

import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import API_URL from '../../config';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const API_URL = "https://zerodha-clone-backend-ax9w.onrender.com";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    return alert("Passwords do not match.");
  }

  try {
    const res = await axios.post(`${API_URL}/api/signup`,
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }
    );

    alert(res.data.message || "Signup successful!");
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed!");
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#F5F7FA", paddingTop: "80px" }}
    >
      <div className="card shadow p-4 border-0" style={{ width: "420px" }}>
        <h2 className="text-center fw-bold mb-1">Zerodha</h2>
        <p className="text-center text-muted mb-4">Create your account</p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <User size={18} />
              </span>
              <input
                type="text"
                className="form-control"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="form-control"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                autoComplete="new-password"
                onChange={handleChange}
                placeholder="Create a password"
                required
              />

              <span
                className="input-group-text bg-white"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Lock size={18} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                autoComplete="new-password"
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />

              <span
                className="input-group-text bg-white"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button className="btn btn-primary w-100 fw-semibold py-2">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
