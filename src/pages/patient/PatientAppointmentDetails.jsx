import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientSidebar
    from "../../components/patient/PatientSidebar";

import PatientNavbar
    from "../../components/patient/PatientNavbar";

import {
    getMyPatientAppointmentById,
    cancelMyPatientAppointment
} from "../../services/patientAppointmentService";

import "../../styles/patientAppointmentDetails.css";

function PatientAppointmentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const loadAppointment = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getMyPatientAppointmentById(id);

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


    useEffect(() => {

        loadAppointment();

    }, [id]);


    const handleCancel = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this appointment?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            await cancelMyPatientAppointment(id);

            setSuccess(
                "Appointment cancelled successfully."
            );

            await loadAppointment();

        } catch (error) {

            console.error(
                "Failed to cancel appointment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to cancel appointment."
            );

        } finally {

            setActionLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="patient-appointment-details-message">
                Loading appointment...
            </div>
        );
    }


    if (!appointment) {

        return (
            <div className="patient-appointment-details-message">
                {error || "Appointment not found."}
            </div>
        );
    }


    const canCancel =
        appointment.status === "BOOKED";


    return (

        <div className="patient-appointment-details-page">

            <PatientSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <main className="patient-appointment-details-main">

                <PatientNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <div className="patient-appointment-details-content">

                    <div className="patient-appointment-details-header">

                        <div>

                            <h1>
                                Appointment Details
                            </h1>

                            <p>
                                {
                                    appointment.appointmentNumber
                                }
                            </p>

                        </div>


                        <button
                            className="patient-appointment-back-button"
                            onClick={() =>
                                navigate(
                                    "/patient/appointments"
                                )
                            }
                        >
                            ← Back to Appointments
                        </button>

                    </div>


                    {error && (
                        <div className="patient-appointment-error">
                            {error}
                        </div>
                    )}


                    {success && (
                        <div className="patient-appointment-success">
                            {success}
                        </div>
                    )}


                    <div className="patient-appointment-details-card">

                        <div className="patient-detail-row">
                            <span>
                                Appointment Number
                            </span>

                            <strong>
                                {
                                    appointment.appointmentNumber
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Doctor</span>

                            <strong>
                                {
                                    appointment.doctorName
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Department</span>

                            <strong>
                                {
                                    appointment.departmentName
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Date</span>

                            <strong>
                                {
                                    appointment.appointmentDate
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Time</span>

                            <strong>
                                {
                                    appointment.appointmentTime
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Reason</span>

                            <strong>
                                {
                                    appointment.reason
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Symptoms</span>

                            <strong>
                                {
                                    appointment.symptoms ||
                                    "None"
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Status</span>

                            <span
                                className={`patient-appointment-status patient-appointment-status-${String(
                                    appointment.status
                                ).toLowerCase()}`}
                            >
                                {
                                    appointment.status
                                }
                            </span>
                        </div>


                        <div className="patient-detail-row">
                            <span>Doctor's Remarks</span>

                            <strong>
                                {
                                    appointment.remarks ||
                                    "None"
                                }
                            </strong>
                        </div>


                        <div className="patient-detail-row">
                            <span>Created At</span>

                            <strong>
                                {
                                    appointment.createdAt ||
                                    "—"
                                }
                            </strong>
                        </div>

                    </div>


                    {canCancel && (

                        <div className="patient-appointment-actions-section">

                            <button
                                className="patient-cancel-appointment-button"
                                disabled={
                                    actionLoading
                                }
                                onClick={
                                    handleCancel
                                }
                            >
                                {actionLoading
                                    ? "Cancelling..."
                                    : "Cancel Appointment"}
                            </button>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default PatientAppointmentDetails;