import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getReceptionistById,
    updateReceptionist
} from "../../services/receptionistService";

import "../../styles/editReceptionist.css";

function EditReceptionist() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {

        const loadReceptionist = async () => {

            try {

                const data =
                    await getReceptionistById(id);

                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    gender: data.gender || "",
                    dateOfBirth: data.dateOfBirth || "",
                    phone: data.phone || "",
                    address: data.address || ""
                });

            } catch (error) {

                console.error(
                    "Failed to load receptionist:",
                    error
                );

                setError(
                    "Unable to load receptionist."
                );

            } finally {

                setLoading(false);
            }
        };

        loadReceptionist();

    }, [id]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            await updateReceptionist(
                id,
                formData
            );

            setSuccess(
                "Receptionist updated successfully."
            );

            setTimeout(() => {
                navigate("/admin/receptionists");
            }, 1000);

        } catch (error) {

            console.error(
                "Failed to update receptionist:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update receptionist."
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-receptionist-message">
                Loading receptionist...
            </div>
        );
    }

    return (
    <div className="edit-receptionist-page">

        <div className="edit-receptionist-container">

            <div className="edit-receptionist-header">

                <div>
                    <h1>Edit Receptionist</h1>

                    <p>
                        Update receptionist information
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
                className="edit-receptionist-form"
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

                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
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
                        className="receptionist-update-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Receptionist"}
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}

export default EditReceptionist;