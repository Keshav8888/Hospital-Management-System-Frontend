import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import { getActiveDepartments } from "../../services/departmentService";
import "../../styles/editDoctor.css";

function EditDoctor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        qualification: "",
        specialization: "",
        experience: "",
        consultantion_Fee: "",
        departmentId: "",
        address: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadDoctor();
        loadDepartments();
    }, [id]);

    const loadDoctor = async () => {
        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                `/api/admin/doctors/${id}`
            );

            const doctor = response.data;

            setFormData({
                firstName: doctor.firstName || "",
                lastName: doctor.lastName || "",
                gender: doctor.gender || "",
                phone: doctor.phone || "",
                qualification: doctor.qualification || "",
                specialization: doctor.specialization || "",
                experience: doctor.experience ?? "",
                consultantion_Fee: doctor.consultantionFee ?? "",
                departmentId: doctor.departmentId ?? "",
                address: doctor.address || ""
            });

        } catch (error) {

            console.error(
                "Failed to load doctor:",
                error
            );

            setError("Unable to load doctor.");

        } finally {

            setLoading(false);
        }
    };

    const loadDepartments = async () => {
        try {

            const data = await getActiveDepartments();

            setDepartments(data);

        } catch (error) {

            console.error(
                "Failed to load departments:",
                error
            );

            setError("Unable to load departments.");
        }
    };

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

            const requestData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                phone: formData.phone,
                qualification: formData.qualification,
                specialization: formData.specialization,
                experience: Number(formData.experience),
                consultantion_Fee: Number(formData.consultantion_Fee),
                departmentId: Number(formData.departmentId),
                address: formData.address
            };

            await api.put(
                `/api/admin/doctors/${id}`,
                requestData
            );

            setSuccess(
                "Doctor updated successfully."
            );

            setTimeout(() => {
                navigate("/admin/doctors");
            }, 1000);

        } catch (error) {

            console.error(
                "Failed to update doctor:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update doctor."
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return <h2>Loading doctor...</h2>;
    }

    if (error && !formData.firstName) {
        return <h2>{error}</h2>;
    }

    return (
    <div className="edit-doctor-page">

        <div className="edit-doctor-container">

            <div className="edit-doctor-header">

                <div>
                    <h1>Edit Doctor</h1>

                    <p>
                        Update doctor information
                    </p>
                </div>

                <button
                    type="button"
                    className="back-doctors-button"
                    onClick={() =>
                        navigate("/admin/doctors")
                    }
                >
                    ← Back to Doctors
                </button>

            </div>

            {error && (
                <div className="edit-form-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="edit-form-success">
                    {success}
                </div>
            )}

            <form
                className="edit-doctor-form"
                onSubmit={handleSubmit}
            >

                <div className="edit-form-group">
                    <label>First Name</label>

                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label>Last Name</label>

                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="edit-form-group">
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

                <div className="edit-form-group">
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

                <div className="edit-form-group">
                    <label>Qualification</label>

                    <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label>Specialization</label>

                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label>Experience</label>

                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label>Consultation Fee</label>

                    <input
                        type="number"
                        name="consultantion_Fee"
                        value={formData.consultantion_Fee}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label>Department</label>

                    <select
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="edit-form-group edit-full-width">
                    <label>Address</label>

                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="edit-form-actions">

                    <button
                        type="button"
                        className="edit-cancel-button"
                        onClick={() =>
                            navigate("/admin/doctors")
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="edit-update-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Doctor"}
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}

export default EditDoctor;