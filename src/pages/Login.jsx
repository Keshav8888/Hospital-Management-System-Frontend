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
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        try {

            const loginData = {
                email,
                password
            };

            const response = await loginUser(loginData);

            console.log("Login successful:", response);

            if (response.role === "ADMIN") {

                navigate("/admin/dashboard");

            } else if (response.role === "DOCTOR") {

                navigate("/doctor/dashboard");

            } else if (response.role === "PATIENT") {

                navigate("/patient/dashboard");

            } else if (response.role === "RECEPTIONIST") {

                navigate("/receptionist/dashboard");

            } else {

                setError("Invalid user role.");
            }

        } catch (error) {

            console.error("Login failed:", error);

            setError(error.response.data?.message || "Invalid email or password.");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="login-page">

            <div className="login-background">

                <div className="login-card">

                    {/* Hospital Branding */}

                    <div className="login-brand">

                        {/* <div className="hospital-logo">
                            HMS
                        </div> */}

                        <h1>
                            Hospital Management System
                        </h1>

                        <p>
                            Manage healthcare services efficiently
                        </p>

                    </div>


                    {/* Login Heading */}

                    <div className="login-heading">

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Sign in to continue to your account
                        </p>

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="login-error">
                            {error}
                        </div>

                    )}


                    {/* Form */}

                    <form
                        className="login-form"
                        onSubmit={handleLogin}
                    >

                        {/* Email */}

                        <div className="login-form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                            />

                        </div>


                        {/* Password */}

                        <div className="login-form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="password-input-container">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}
                        </button>

                    </form>


                    {/* Footer */}

                    <div className="login-footer">

                        {/* <p>
                            Hospital Management System
                        </p> */}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;