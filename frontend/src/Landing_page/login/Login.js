import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import API_URL from "../../config";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.message) {
        alert(res.data.message || "Login successful!");
      }

      setFormData({
        email: "",
        password: "",
      });

      // Redirect to dashboard
      const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "https://zerodha-clone-dashboard-vd6u.onrender.com";
      setTimeout(() => {
        window.location.href = dashboardUrl;
      }, 1000);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
  .login-container {
  min-height: 100vh;
  background: #F5F7FA;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

          .login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  box-sizing: border-box;
}

          .login-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
}

          .login-subtitle {
  text-align: center;
  color: #6c757d;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

          .form-group {
  margin-bottom: 1rem;
}

          .form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.875rem;
  color: #333;
}

          .input-wrapper {
  display: flex;
  border: 1px solid #ced4da;
  border-radius: 4px;
  overflow: hidden;
  background: white;
}

          .input-wrapper:focus-within {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

          .input-icon {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  background: #f8f9fa;
  border-right: 1px solid #ced4da;
}

          .form-input {
  flex: 1;
  border: none;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  min-width: 0;
}

          .form-input:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

          .eye-icon {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  cursor: pointer;
  border-left: 1px solid #ced4da;
  background: #f8f9fa;
}

          .eye-icon:hover {
  background: #e9ecef;
}

          .submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;
}

          .submit-btn:hover:not(:disabled) {
  background: #0b5ed7;
}

          .submit-btn:disabled {
  background: #6c9bd1;
  cursor: not-allowed;
  opacity: 0.7;
}

          .spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 0.5rem;
  vertical-align: middle;
}

@keyframes spin {
            to { transform: rotate(360deg); }
}

          .signup-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6c757d;
}

          .signup-link a {
  color: #0d6efd;
  text-decoration: none;
}

          .signup-link a:hover {
  text-decoration: underline;
}

/* Mobile Styles - 350px to 480px */
@media(max-width: 480px) {
            .login-container {
    padding: 0.75rem;
  }

            .login-card {
    padding: 1.25rem;
  }

            .login-title {
    font-size: 1.25rem;
  }

            .login-subtitle {
    font-size: 0.8rem;
    margin-bottom: 1.25rem;
  }

            .form-group {
    margin-bottom: 0.875rem;
  }

            .form-label {
    font-size: 0.8rem;
    margin-bottom: 0.35rem;
  }

            .input-icon {
    padding: 0 0.5rem;
  }

            .form-input {
    padding: 0.5rem 0.6rem;
    font-size: 0.8rem;
  }

            .eye-icon {
    padding: 0 0.5rem;
  }

            .submit-btn {
    padding: 0.625rem;
    font-size: 0.9rem;
  }

            .signup-link {
    font-size: 0.8rem;
  }
}

/* Extra Small Mobile - 320px to 350px */
@media(max-width: 350px) {
            .login-container {
    padding: 0.5rem;
  }

            .login-card {
    padding: 1rem;
  }

            .login-title {
    font-size: 1.1rem;
  }

            .login-subtitle {
    font-size: 0.75rem;
  }

            .form-label {
    font-size: 0.75rem;
  }

            .form-input {
    padding: 0.45rem 0.5rem;
    font-size: 0.75rem;
  }

            .input-icon {
    padding: 0 0.4rem;
  }

            .eye-icon {
    padding: 0 0.4rem;
  }

            .submit-btn {
    padding: 0.55rem;
    font-size: 0.85rem;
  }

            .signup-link {
    font-size: 0.75rem;
  }
}

/* Tablet and larger */
@media(min-width: 768px) {
            .login-card {
    padding: 2.5rem;
  }
}
`}
      </style>

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Zerodha</h2>
          <p className="login-subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  autoComplete="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className="form-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  autoComplete="current-password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="form-input"
                />
                <span
                  className="eye-icon"
                  onClick={() => !loading && setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
}
