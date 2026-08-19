import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getReceptionistById } from "../../services/receptionistService";

import "../../styles/receptionistDetails.css";

function ReceptionistDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [receptionist, setReceptionist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadReceptionist = async () => {

            try {

                const data = await getReceptionistById(id);

                setReceptionist(data);

            } catch (error) {

                console.error(
                    "Failed to load receptionist:",
                    error
                );

                setError(
                    "Unable to load receptionist details."
                );

            } finally {

                setLoading(false);
            }
        };

        loadReceptionist();

    }, [id]);

    if (loading) {
        return (
            <div className="receptionist-details-message">
                Loading receptionist...
            </div>
        );
    }

    if (error) {
        return (
            <div className="receptionist-details-message">
                {error}
            </div>
        );
    }

    if (!receptionist) {
        return (
            <div className="receptionist-details-message">
                Receptionist not found.
            </div>
        );
    }

    return (
        <div className="receptionist-details-page">

            <div className="receptionist-details-container">

                <div className="receptionist-details-header">

                    <div>

                        <h1>
                            Receptionist Details
                        </h1>

                        <p>
                            Receptionist ID: {receptionist.id}
                        </p>

                    </div>

                    <button
                        className="receptionist-back-button"
                        onClick={() =>
                            navigate("/admin/receptionists")
                        }
                    >
                        ← Back to Receptionists
                    </button>

                </div>


                <div className="receptionist-details-card">

                    <div className="receptionist-detail-row">
                        <span>Receptionist ID</span>
                        <strong>
                            {receptionist.id}
                        </strong>
                    </div>

                    <div className="receptionist-detail-row">
                        <span>Name</span>
                        <strong>
                            {receptionist.firstName}{" "}
                            {receptionist.lastName}
                        </strong>
                    </div>

                    <div className="receptionist-detail-row">
                        <span>Email</span>
                        <strong>
                            {receptionist.email}
                        </strong>
                    </div>

                    <div className="receptionist-detail-row">
                        <span>Gender</span>
                        <strong>
                            {receptionist.gender}
                        </strong>
                    </div>

                    <div className="receptionist-detail-row">
                        <span>Date of Birth</span>
                        <strong>
                            {receptionist.dateOfBirth}
                        </strong>
                    </div>

                    <div className="receptionist-detail-row">
                        <span>Phone</span>
                        <strong>
                            {receptionist.phone}
                        </strong>
                    </div>

                    <div className="receptionist-detail-row">
                        <span>Address</span>
                        <strong>
                            {receptionist.address}
                        </strong>
                    </div>

                    <div className="receptionist-detail-row">
                        <span>Status</span>

                        <span
                            className={
                                receptionist.status === "ACTIVE"
                                    ? "receptionist-status receptionist-status-active"
                                    : "receptionist-status receptionist-status-inactive"
                            }
                        >
                            {receptionist.status}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ReceptionistDetails;