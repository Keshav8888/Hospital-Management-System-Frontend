import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerReceptionist } from "../../services/receptionistService";

import "../../styles/addReceptionist.css";

function AddReceptionist() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        address: ""
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

            await registerReceptionist(formData);

            setSuccess(
                "Receptionist registered successfully."
            );

            setTimeout(() => {
                navigate("/admin/receptionists");
            }, 1000);

        } catch (error) {

            console.error(
                "Failed to register receptionist:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to register receptionist."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="add-receptionist-page">

            <div className="add-receptionist-container">

                <div className="add-receptionist-header">

                    <div>

                        <h1>Add Receptionist</h1>

                        <p>
                            Register a new receptionist
                        </p>

                    </div>

                    <button
                        type="button"
                        className="receptionist-back-button"
                        onClick={() =>
                            navigate("/admin/receptionists")
                        }
                    >
                        ← Back to Receptionists
                    </button>

                </div>

                {error && (
                    <div className="receptionist-form-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="receptionist-form-success">
                        {success}
                    </div>
                )}

                <form
                    className="add-receptionist-form"
                    onSubmit={handleSubmit}
                >

                    <div className="receptionist-form-group">
                        <label>First Name</label>

                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="receptionist-form-group">
                        <label>Last Name</label>

                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="receptionist-form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="receptionist-form-group">
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

                    <div className="receptionist-form-group">
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

                    <div className="receptionist-form-group">
                        <label>Date of Birth</label>

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="receptionist-form-group">
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

                    <div className="receptionist-form-group">
                        <label>Address</label>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="receptionist-form-actions">

                        <button
                            type="button"
                            className="receptionist-cancel-button"
                            onClick={() =>
                                navigate("/admin/receptionists")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="receptionist-submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Registering..."
                                : "Register Receptionist"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddReceptionist;