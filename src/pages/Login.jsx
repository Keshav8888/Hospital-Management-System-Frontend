import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");

    try {
      const loginData = {
        email,
        password,
      };

      const response = await loginUser(loginData);

      console.log("Login successful:", response);
      
      localStorage.setItem("firstName", response.firstName || "");

      if (response.role === "ADMIN") {
        setSuccess("Login successful.");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else if (response.role === "DOCTOR") {
        setSuccess("Login successful.");

        setTimeout(() => {
          navigate("/doctor/dashboard");
        }, 1000);
      } else if (response.role === "PATIENT") {
        setSuccess("Login successful.");

        setTimeout(() => {
          navigate("/patient/dashboard");
        }, 1000);
      } else if (response.role === "RECEPTIONIST") {
        setSuccess(
          "Login successful.",
        );

        setTimeout(() => {
          navigate("/receptionist/dashboard");
        }, 1000);
      } else {
        setError("Invalid user role.");
      }
    } catch (error) {
      console.error("Login failed:", error);

      setSuccess("");

      setError(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-overlay"></div>

        <div className="login-card">
          {/* Heading */}

          <div className="login-heading">
            <h1>Sign in to continue to your account</h1>
          </div>

          {/* Error */}

          {error && <div className="login-error">{error}</div>}

          {success && <div className="login-success">{success}</div>}
          {/* Login Form */}

          <form className="login-form" onSubmit={handleLogin}>
            {/* Email */}

            <div className="login-form-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}

            <div className="login-form-group">
              <label htmlFor="password">Password</label>

              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className={`password-toggle ${
                    showPassword ? "password-toggle-visible" : ""
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    /* Eye open */

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    /* Eye closed */

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M9.88 5.08C10.57 4.85 11.28 4.75 12 4.75C18.5 4.75 22 12 22 12C22 12 20.82 14.36 18.75 16.3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M6.61 6.61C3.78 8.6 2 12 2 12C2 12 5.5 19.25 12 19.25C13.54 19.25 14.94 18.84 16.17 18.17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign In */}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register */}

          <div className="login-register-text">
            <span>Doesn't have a Account?</span>

            <button
              type="button"
              className="login-register-link"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
