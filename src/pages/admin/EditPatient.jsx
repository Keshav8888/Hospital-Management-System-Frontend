import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import AdminSidebar from "../../components/admin/AdminSidebar";
// import AdminNavbar from "../../components/admin/AdminNavbar";

import {
    getPatientById,
    updatePatient
} from "../../services/patientService";

import "../../styles/editPatient.css";

function EditPatient() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        bloodGroup: "",
        address: "",
        emergencyContact: "",
        allergies: "",
        medicalHistory: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    // const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {

        const loadPatient = async () => {

            try {

                const data = await getPatientById(id);

                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    gender: data.gender || "",
                    dateOfBirth: data.dateOfBirth || "",
                    phone: data.phone || "",
                    bloodGroup: data.bloodGroup || "",
                    address: data.address || "",
                    emergencyContact:
                        data.emergencyContact || "",
                    allergies: data.allergies || "",
                    medicalHistory:
                        data.medicalHistory || ""
                });

            } catch (error) {

                console.error(
                    "Failed to load patient:",
                    error
                );

                setError("Unable to load patient.");

            } finally {

                setLoading(false);
            }
        };

        loadPatient();

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

            await updatePatient(id, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                phone: formData.phone,
                bloodGroup: formData.bloodGroup,
                address: formData.address,
                emergencyContact:
                    formData.emergencyContact,
                allergies: formData.allergies,
                medicalHistory:
                    formData.medicalHistory
            });

            setSuccess(
                "Patient updated successfully."
            );

            setTimeout(() => {
                navigate("/admin/patients");
            }, 1000);

        } catch (error) {

            console.error(
                "Failed to update patient:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update patient."
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="patient-edit-message">
                Loading patient...
            </div>
        );
    }

    return (

    <div className="edit-patient-page">

        <div className="edit-patient-container">

            <div className="edit-patient-header">

                <div>

                    <h1>
                        Edit Patient
                    </h1>

                    <p>
                        Update patient information
                    </p>

                </div>

                <button
                    type="button"
                    className="patient-back-button"
                    onClick={() =>
                        navigate("/admin/patients")
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
                className="edit-patient-form"
                onSubmit={handleSubmit}
            >

                <div className="patient-form-group">

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


                <div className="patient-form-group">

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


                <div className="patient-form-group">

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


                <div className="patient-form-group">

                    <label>
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="patient-form-group">

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


                <div className="patient-form-group">

                    <label>
                        Blood Group
                    </label>

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


                <div className="patient-form-group">

                    <label>
                        Emergency Contact
                    </label>

                    <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        maxLength="10"
                        required
                    />

                </div>


                <div className="patient-form-group">

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


                <div className="patient-form-group patient-full-width">

                    <label>
                        Allergies
                    </label>

                    <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                    />

                </div>


                <div className="patient-form-group patient-full-width">

                    <label>
                        Medical History
                    </label>

                    <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                    />

                </div>


                <div className="patient-form-actions">

                    <button
                        type="button"
                        className="patient-cancel-button"
                        onClick={() =>
                            navigate("/admin/patients")
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="patient-update-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Patient"}
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}

export default EditPatient;