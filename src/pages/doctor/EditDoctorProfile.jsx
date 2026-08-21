import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorSidebar
    from "../../components/doctor/DoctorSidebar";

import DoctorNavbar
    from "../../components/doctor/DoctorNavbar";

import {
    getMyDoctorProfile,
    updateMyDoctorProfile
} from "../../services/doctorProfileService";

import "../../styles/editDoctorProfile.css";

function EditDoctorProfile() {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        qualification: "",
        specialization: "",
        address: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data =
                    await getMyDoctorProfile();

                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    gender: data.gender || "",
                    dateOfBirth:
                        data.dateOfBirth || "",
                    phone: data.phone || "",
                    qualification:
                        data.qualification || "",
                    specialization:
                        data.specialization || "",
                    address:
                        data.address || ""
                });

            } catch (error) {

                console.error(
                    "Failed to load profile:",
                    error
                );

                setError(
                    "Unable to load profile."
                );

            } finally {

                setLoading(false);
            }
        };

        loadProfile();

    }, []);

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

            await updateMyDoctorProfile(formData);

            setSuccess(
                "Profile updated successfully."
            );

            setTimeout(() => {

                navigate("/doctor/profile");

            }, 1000);

        } catch (error) {

            console.error(
                "Failed to update doctor profile:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update profile."
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-doctor-profile-message">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="edit-doctor-profile-page">

            <DoctorSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="edit-doctor-profile-main">

                <DoctorNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <div className="edit-doctor-profile-content">

                    <div className="edit-doctor-profile-container">

                        <div className="edit-doctor-profile-header">

                            <div>

                                <h1>
                                    Edit Profile
                                </h1>

                                <p>
                                    Update your doctor information
                                </p>

                            </div>

                            <button
                                type="button"
                                className="doctor-profile-back-button"
                                onClick={() =>
                                    navigate(
                                        "/doctor/profile"
                                    )
                                }
                            >
                                ← Back to Profile
                            </button>

                        </div>


                        {error && (
                            <div className="doctor-profile-form-error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="doctor-profile-form-success">
                                {success}
                            </div>
                        )}


                        <form
                            className="edit-doctor-profile-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="doctor-profile-form-group">

                                <label>First Name</label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    maxLength="50"
                                    required
                                />

                            </div>


                            <div className="doctor-profile-form-group">

                                <label>Last Name</label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    maxLength="50"
                                    required
                                />

                            </div>


                            <div className="doctor-profile-form-group">

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


                            <div className="doctor-profile-form-group">

                                <label>Date of Birth</label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        formData.dateOfBirth
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="doctor-profile-form-group">

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


                            <div className="doctor-profile-form-group">

                                <label>Qualification</label>

                                <input
                                    type="text"
                                    name="qualification"
                                    value={
                                        formData.qualification
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="doctor-profile-form-group">

                                <label>Specialization</label>

                                <input
                                    type="text"
                                    name="specialization"
                                    value={
                                        formData.specialization
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="doctor-profile-form-group">

                                <label>Address</label>

                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="doctor-profile-form-actions">

                                <button
                                    type="button"
                                    className="doctor-profile-cancel-button"
                                    onClick={() =>
                                        navigate(
                                            "/doctor/profile"
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="doctor-profile-update-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Updating..."
                                        : "Update Profile"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </main>
        </div>
    );
}

export default EditDoctorProfile;