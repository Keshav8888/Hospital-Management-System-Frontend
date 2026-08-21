import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientSidebar
    from "../../components/patient/PatientSidebar";

import PatientNavbar
    from "../../components/patient/PatientNavbar";

import {
    getMyPatientProfile,
    updateMyPatientProfile
} from "../../services/patientProfileService";

import "../../styles/editPatientProfile.css";

function EditPatientProfile() {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        bloodGroup: "",
        address: "",
        allergies: "",
        medicalHistory: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data =
                    await getMyPatientProfile();

                setFormData({
                    firstName:
                        data.firstName || "",

                    lastName:
                        data.lastName || "",

                    gender:
                        data.gender || "",

                    dateOfBirth:
                        data.dateOfBirth || "",

                    phone:
                        data.phone || "",

                    bloodGroup:
                        data.bloodGroup || "",

                    address:
                        data.address || "",

                    allergies:
                        data.allergies || "",

                    medicalHistory:
                        data.medicalHistory || ""
                });

            } catch (error) {

                console.error(
                    "Failed to load patient profile:",
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

            await updateMyPatientProfile(
                formData
            );

            setSuccess(
                "Profile updated successfully."
            );

            setTimeout(() => {

                navigate(
                    "/patient/profile"
                );

            }, 1000);

        } catch (error) {

            console.error(
                "Failed to update patient profile:",
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
            <div className="edit-patient-profile-message">
                Loading profile...
            </div>
        );
    }


    return (

        <div className="edit-patient-profile-page">

            <PatientSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />


            <main className="edit-patient-profile-main">

                <PatientNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="edit-patient-profile-content">

                    <div className="edit-patient-profile-container">

                        <div className="edit-patient-profile-header">

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
                                className="patient-profile-back-button"
                                onClick={() =>
                                    navigate(
                                        "/patient/profile"
                                    )
                                }
                            >
                                ← Back to Profile
                            </button>

                        </div>


                        {error && (
                            <div className="patient-profile-form-error">
                                {error}
                            </div>
                        )}


                        {success && (
                            <div className="patient-profile-form-success">
                                {success}
                            </div>
                        )}


                        <form
                            className="edit-patient-profile-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="patient-profile-form-group">

                                <label>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={
                                        formData.firstName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="patient-profile-form-group">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={
                                        formData.lastName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="patient-profile-form-group">

                                <label>
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={
                                        formData.gender
                                    }
                                    onChange={
                                        handleChange
                                    }
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


                            <div className="patient-profile-form-group">

                                <label>
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        formData.dateOfBirth
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="patient-profile-form-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    maxLength="10"
                                    required
                                />

                            </div>


                            <div className="patient-profile-form-group">

                                <label>
                                    Blood Group
                                </label>

                                <select
                                    name="bloodGroup"
                                    value={
                                        formData.bloodGroup
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Blood Group
                                    </option>

                                    <option value="A+">
                                        A+
                                    </option>

                                    <option value="A-">
                                        A-
                                    </option>

                                    <option value="B+">
                                        B+
                                    </option>

                                    <option value="B-">
                                        B-
                                    </option>

                                    <option value="AB+">
                                        AB+
                                    </option>

                                    <option value="AB-">
                                        AB-
                                    </option>

                                    <option value="O+">
                                        O+
                                    </option>

                                    <option value="O-">
                                        O-
                                    </option>

                                </select>

                            </div>


                            <div className="patient-profile-form-group">

                                <label>
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="patient-profile-form-group patient-profile-full-width">

                                <label>
                                    Allergies
                                </label>

                                <textarea
                                    name="allergies"
                                    value={
                                        formData.allergies
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <div className="patient-profile-form-group patient-profile-full-width">

                                <label>
                                    Medical History
                                </label>

                                <textarea
                                    name="medicalHistory"
                                    value={
                                        formData.medicalHistory
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <div className="patient-profile-form-actions">

                                <button
                                    type="button"
                                    className="patient-profile-cancel-button"
                                    onClick={() =>
                                        navigate(
                                            "/patient/profile"
                                        )
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="patient-profile-update-button"
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

export default EditPatientProfile;