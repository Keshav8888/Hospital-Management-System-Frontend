import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/patientRegister.css";

function PatientRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        emergencyContact: "",
        bloodGroup: "",
        address: "",
        allergies: "",
        medicalHistory: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            await api.post(
                "/api/auth/register",
                formData
            );

            setSuccess(
                "Registration successful. You can now login."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(
                "Patient registration failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to complete registration."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="patient-register-page">

            <div className="patient-register-card">

                <div className="patient-register-header">


                    <h1>
                        Patient Registration
                    </h1>

                    <p>
                        Create your patient account
                    </p>

                </div>

                {error && (
                    <div className="register-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="register-success">
                        {success}
                    </div>
                )}

                <form
                    className="patient-register-form"
                    onSubmit={handleSubmit}
                >

                    <div className="register-field">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="8"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Gender
                            </option>

                            <option value="MALE">
                                Male
                            </option>

                            <option value="FEMALE">
                                Female
                            </option>

                            <option value="OTHER">
                                Other
                            </option>
                        </select>
                    </div>

                    <div className="register-field">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Emergency Contact</label>
                        <input
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            maxLength="10"
                        />
                    </div>

                    <div className="register-field">
                        <label>Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Blood Group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div className="register-field register-full">
                        <label>Address</label>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field register-full">
                        <label>Allergies</label>

                        <textarea
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-field register-full">
                        <label>Medical History</label>

                        <textarea
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="register-actions">

                        <button
                            type="button"
                            className="register-cancel-button"
                            onClick={() => navigate("/")}
                        >
                            Back
                        </button>

                        <button
                            type="submit"
                            className="register-submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Registering..."
                                : "Create Account"}
                        </button>

                    </div>

                </form>

                <div className="register-login-link">

                    Already have an account?

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PatientRegister;