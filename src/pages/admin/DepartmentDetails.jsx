import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getDepartmentById } from "../../services/departmentService";

import "../../styles/departmentDetails.css";

function DepartmentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadDepartment = async () => {

            try {

                const data =
                    await getDepartmentById(id);

                setDepartment(data);

            } catch (error) {

                console.error(
                    "Failed to load department:",
                    error
                );

                setError(
                    "Unable to load department details."
                );

            } finally {

                setLoading(false);
            }
        };

        loadDepartment();

    }, [id]);

    if (loading) {
        return (
            <div className="department-details-message">
                Loading department...
            </div>
        );
    }

    if (error) {
        return (
            <div className="department-details-message">
                {error}
            </div>
        );
    }

    if (!department) {
        return (
            <div className="department-details-message">
                Department not found.
            </div>
        );
    }

    return (
        <div className="department-details-page">

            <div className="department-details-container">

                <div className="department-details-header">

                    <div>

                        <h1>
                            Department Details
                        </h1>

                        <p>
                            Department ID:{" "}
                            {department.id}
                        </p>

                    </div>

                    <button
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


                <div className="department-details-card">

                    <div className="department-detail-row">
                        <span>
                            Department ID
                        </span>

                        <strong>
                            {department.id}
                        </strong>
                    </div>


                    <div className="department-detail-row">
                        <span>
                            Name
                        </span>

                        <strong>
                            {department.name}
                        </strong>
                    </div>


                    <div className="department-detail-row">
                        <span>
                            Location
                        </span>

                        <strong>
                            {department.location}
                        </strong>
                    </div>


                    <div className="department-detail-row department-description-row">
                        <span>
                            Description
                        </span>

                        <strong>
                            {department.description ||
                                "No description available"}
                        </strong>
                    </div>


                    <div className="department-detail-row">
                        <span>
                            Status
                        </span>

                        <span
                            className={
                                department.status ===
                                "ACTIVE"
                                    ? "department-status department-status-active"
                                    : "department-status department-status-inactive"
                            }
                        >
                            {department.status}
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default DepartmentDetails;