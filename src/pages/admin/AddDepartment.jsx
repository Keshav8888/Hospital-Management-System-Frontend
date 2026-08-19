import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createDepartment } from "../../services/departmentService";

import "../../styles/addDepartment.css";

function AddDepartment() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: ""
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

            await createDepartment(formData);

            setSuccess(
                "Department created successfully."
            );

            setTimeout(() => {
                navigate("/admin/departments");
            }, 1000);

        } catch (error) {

            console.error(
                "Failed to create department:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create department."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="add-department-page">

            <div className="add-department-container">

                <div className="add-department-header">

                    <div>
                        <h1>Add Department</h1>

                        <p>
                            Create a new hospital department
                        </p>
                    </div>

                    <button
                        type="button"
                        className="department-back-button"
                        onClick={() =>
                            navigate("/admin/departments")
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
                    className="add-department-form"
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
                                navigate("/admin/departments")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="department-submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Department"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddDepartment;