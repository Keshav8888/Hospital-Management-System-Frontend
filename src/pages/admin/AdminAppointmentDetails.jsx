import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAdminAppointmentById } from "../../services/appointmentService";

import "../../styles/adminAppointmentDetails.css";

function AdminAppointmentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadAppointment = async () => {

            try {

                const data =
                    await getAdminAppointmentById(id);

                setAppointment(data);

            } catch (error) {

                console.error(
                    "Failed to load appointment:",
                    error
                );

                setError(
                    "Unable to load appointment details."
                );

            } finally {

                setLoading(false);
            }
        };

        loadAppointment();

    }, [id]);


    if (loading) {

        return (
            <div className="admin-appointment-details-message">
                Loading appointment...
            </div>
        );
    }


    if (error) {

        return (
            <div className="admin-appointment-details-message">
                {error}
            </div>
        );
    }


    if (!appointment) {

        return (
            <div className="admin-appointment-details-message">
                Appointment not found.
            </div>
        );
    }


    return (

        <div className="admin-appointment-details-page">

            <div className="admin-appointment-details-container">

                <div className="admin-appointment-details-header">

                    <div>

                        <h1>
                            Appointment Details
                        </h1>

                        <p>
                            Appointment Number:{" "}
                            {appointment.appointmentNumber}
                        </p>

                    </div>


                    <button
                        className="appointment-back-button"
                        onClick={() =>
                            navigate("/admin/appointments")
                        }
                    >
                        ← Back to Appointments
                    </button>

                </div>


                <div className="admin-appointment-details-card">

                    <div className="appointment-detail-row">
                        <span>Appointment ID</span>

                        <strong>
                            {appointment.id}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Appointment Number</span>

                        <strong>
                            {appointment.appointmentNumber}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Patient</span>

                        <strong>
                            {appointment.patientName}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Patient ID</span>

                        <strong>
                            {appointment.patientId}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Doctor</span>

                        <strong>
                            {appointment.doctorName}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Doctor ID</span>

                        <strong>
                            {appointment.doctorId}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Department</span>

                        <strong>
                            {appointment.departmentName}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Appointment Date</span>

                        <strong>
                            {appointment.appointmentDate}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Appointment Time</span>

                        <strong>
                            {appointment.appointmentTime}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Reason</span>

                        <strong>
                            {appointment.reason}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Symptoms</span>

                        <strong>
                            {appointment.symptoms || "None"}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Status</span>

                        <span
                            className={`appointment-details-status appointment-details-status-${String(
                                appointment.status
                            ).toLowerCase()}`}
                        >
                            {appointment.status}
                        </span>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Consultation Remarks</span>

                        <strong>
                            {appointment.remarks || "None"}
                        </strong>
                    </div>


                    <div className="appointment-detail-row">
                        <span>Created At</span>

                        <strong>
                            {appointment.createdAt || "—"}
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminAppointmentDetails;