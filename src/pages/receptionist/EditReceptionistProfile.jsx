import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyReceptionistProfile,
    updateMyReceptionistProfile
} from "../../services/receptionistProfileService";

import ReceptionistSidebar
    from "../../components/receptionist/ReceptionistSidebar";

import ReceptionistNavbar
    from "../../components/receptionist/ReceptionistNavbar";

import "../../styles/editReceptionistProfile.css";

function EditReceptionistProfile() {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

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

        const loadProfile = async () => {

            try {

                const data =
                    await getMyReceptionistProfile();

                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    gender: data.gender || "",
                    dateOfBirth:
                        data.dateOfBirth || "",
                    phone: data.phone || "",
                    address: data.address || ""
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

            await updateMyReceptionistProfile(
                formData
            );

            setSuccess(
                "Profile updated successfully."
            );

            setTimeout(() => {

                navigate(
                    "/receptionist/profile"
                );

            }, 1000);

        } catch (error) {

            console.error(
                "Failed to update profile:",
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
            <div className="edit-receptionist-profile-message">
                Loading profile...
            </div>
        );
    }


    return (

        <div className="edit-receptionist-profile-page">

            <ReceptionistSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />


            <main className="edit-receptionist-profile-main">

                <ReceptionistNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="edit-receptionist-profile-content">

                    <div className="edit-receptionist-profile-container">

                        <div className="edit-receptionist-profile-header">

                            <div>

                                <h1>
                                    Edit Profile
                                </h1>

                                <p>
                                    Update your personal information
                                </p>

                            </div>


                            <button
                                type="button"
                                className="profile-back-button"
                                onClick={() =>
                                    navigate(
                                        "/receptionist/profile"
                                    )
                                }
                            >
                                ← Back to Profile
                            </button>

                        </div>


                        {error && (
                            <div className="profile-form-error">
                                {error}
                            </div>
                        )}


                        {success && (
                            <div className="profile-form-success">
                                {success}
                            </div>
                        )}


                        <form
                            className="edit-receptionist-profile-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="profile-form-group">

                                <label>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>
                                    Gender
                                </label>

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


                            <div className="profile-form-group">

                                <label>
                                    Date of Birth
                                </label>

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


                            <div className="profile-form-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength="10"
                                    required
                                />

                            </div>


                            <div className="profile-form-group">

                                <label>
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="profile-form-actions">

                                <button
                                    type="button"
                                    className="profile-cancel-button"
                                    onClick={() =>
                                        navigate(
                                            "/receptionist/profile"
                                        )
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="profile-update-button"
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

export default EditReceptionistProfile;