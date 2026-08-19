import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getDepartmentById,
    updateDepartment
} from "../../services/departmentService";

import "../../styles/editDepartment.css";

function EditDepartment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {

        const loadDepartment = async () => {

            try {

                const data =
                    await getDepartmentById(id);

                setFormData({
                    name: data.name || "",
                    description:
                        data.description || "",
                    location:
                        data.location || ""
                });

            } catch (error) {

                console.error(
                    "Failed to load department:",
                    error
                );

                setError(
                    "Unable to load department."
                );

            } finally {

                setLoading(false);
            }
        };

        loadDepartment();

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

            await updateDepartment(
                id,
                formData
            );

            setSuccess(
                "Department updated successfully."
            );

            setTimeout(() => {
                navigate("/admin/departments");
            }, 1000);

        } catch (error) {

            console.error(
                "Failed to update department:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update department."
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-department-message">
                Loading department...
            </div>
        );
    }

    return (
        <div className="edit-department-page">

            <div className="edit-department-container">

                <div className="edit-department-header">

                    <div>

                        <h1>
                            Edit Department
                        </h1>

                        <p>
                            Update department information
                        </p>

                    </div>

                    <button
                        type="button"
                        className="department-back-button"
                        onClick={() =>
                            navigate(
                                "/admin/departments"
                            )
                        }
                    >
                        ← Back to Departments
                    </button>

                </div>

                {error && (
                    <div className="department-form-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="department-form-success">
                        {success}
                    </div>
                )}

                <form
                    className="edit-department-form"
                    onSubmit={handleSubmit}
                >

                    <div className="department-form-group">

                        <label>
                            Department Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="department-form-group">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="department-form-group department-full-width">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="department-form-actions">

                        <button
                            type="button"
                            className="department-cancel-button"
                            onClick={() =>
                                navigate(
                                    "/admin/departments"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="department-update-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Department"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditDepartment;