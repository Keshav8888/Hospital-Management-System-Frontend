import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const loginData = {
                email: email,
                password: password
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

            if (error.response) {

                setError(
                    error.response.data?.message ||
                    "Invalid email or password."
                );

            } else {

                setError("Unable to connect to server.");
            }
        }
    };

    return (
        <div>

            <h2>Hospital Management System</h2>

            <h3>Login</h3>

            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;