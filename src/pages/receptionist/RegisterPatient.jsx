import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    registerReceptionistPatient
} from "../../services/receptionistPatientService";

import "../../styles/registerPatient.css";

function RegisterPatient() {

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

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            await registerReceptionistPatient(formData);

            setSuccess(
                "Patient registered successfully."
            );

            setTimeout(() => {
                navigate("/receptionist/patients");
            }, 1000);

        } catch (error) {

            console.error(
                "Failed to register patient:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to register patient."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="register-patient-page">

            <div className="register-patient-container">

                <div className="register-patient-header">

                    <div>

                        <h1>
                            Register Patient
                        </h1>

                        <p>
                            Register a new hospital patient
                        </p>

                    </div>

                    <button
                        type="button"
                        className="patient-back-button"
                        onClick={() =>
                            navigate(
                                "/receptionist/patients"
                            )
                        }
                    >
                        ← Back to Patients
                    </button>

                </div>


                {error && (
                    <div className="patient-form-error">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="patient-form-success">
                        {success}
                    </div>
                )}


                <form
                    className="register-patient-form"
                    onSubmit={handleSubmit}
                >

                    <div className="patient-form-group">

                        <label>First Name</label>

                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="patient-form-group">

                        <label>Last Name</label>

                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="patient-form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="patient-form-group">

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


                    <div className="patient-form-group">

                        <label>Gender</label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
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


                    <div className="patient-form-group">

                        <label>Date of Birth</label>

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="patient-form-group">

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


                    <div className="patient-form-group">

                        <label>Blood Group</label>

                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
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


                    <div className="patient-form-group">

                        <label>Emergency Contact</label>

                        <input
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            maxLength="10"
                        />

                    </div>


                    <div className="patient-form-group">

                        <label>Address</label>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="patient-form-group patient-full-width">

                        <label>Allergies</label>

                        <textarea
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            placeholder="Enter allergies"
                        />

                    </div>


                    <div className="patient-form-group patient-full-width">

                        <label>Medical History</label>

                        <textarea
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                            placeholder="Enter medical history"
                        />

                    </div>


                    <div className="patient-form-actions">

                        <button
                            type="button"
                            className="patient-cancel-button"
                            onClick={() =>
                                navigate(
                                    "/receptionist/patients"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="patient-submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Registering..."
                                : "Register Patient"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default RegisterPatient;