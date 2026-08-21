import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getDoctorAppointmentById,
    confirmDoctorAppointment,
    completeDoctorAppointment,
    addConsultationRemarks
} from "../../services/doctorAppointmentService";

import DoctorSidebar
    from "../../components/doctor/DoctorSidebar";

import DoctorNavbar
    from "../../components/doctor/DoctorNavbar";

import "../../styles/doctorAppointmentDetails.css";

function DoctorAppointmentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [remarks, setRemarks] = useState("");

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
                await getDoctorAppointmentById(id);

            setAppointment(data);

            setRemarks(data.remarks || "");

        } catch (error) {

            console.error(
                "Failed to load appointment:",
                error
            );

            setError(
                "Unable to load appointment."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        loadAppointment();
    }, [id]);


    const handleConfirm = async () => {

        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            await confirmDoctorAppointment(id);

            setSuccess(
                "Appointment confirmed successfully."
            );

            await loadAppointment();

        } catch (error) {

            console.error(
                "Failed to confirm appointment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to confirm appointment."
            );

        } finally {

            setActionLoading(false);
        }
    };


    const handleComplete = async () => {

        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            await completeDoctorAppointment(id);

            setSuccess(
                "Appointment completed successfully."
            );

            await loadAppointment();

        } catch (error) {

            console.error(
                "Failed to complete appointment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to complete appointment."
            );

        } finally {

            setActionLoading(false);
        }
    };


    const handleRemarks = async (event) => {

        event.preventDefault();

        if (!remarks.trim()) {
            setError("Remarks are required.");
            return;
        }

        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            await addConsultationRemarks(
                id,
                remarks
            );

            setSuccess(
                "Consultation remarks added successfully."
            );

            await loadAppointment();

        } catch (error) {

            console.error(
                "Failed to add remarks:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to add consultation remarks."
            );

        } finally {

            setActionLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="doctor-appointment-details-message">
                Loading appointment...
            </div>
        );
    }


    if (error && !appointment) {
        return (
            <div className="doctor-appointment-details-message">
                {error}
            </div>
        );
    }


    if (!appointment) {
        return (
            <div className="doctor-appointment-details-message">
                Appointment not found.
            </div>
        );
    }


    return (
        <div className="doctor-appointment-details-page">

            <DoctorSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="doctor-appointment-details-main">

                <DoctorNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <div className="doctor-appointment-details-content">

                    <div className="doctor-appointment-details-header">

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
                            className="appointment-back-button"
                            onClick={() =>
                                navigate(
                                    "/doctor/appointments"
                                )
                            }
                        >
                            ← Back to Appointments
                        </button>

                    </div>


                    {error && (
                        <div className="doctor-action-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="doctor-action-success">
                            {success}
                        </div>
                    )}


                    <div className="doctor-appointment-details-card">

                        <div className="doctor-detail-row">
                            <span>Appointment Number</span>
                            <strong>
                                {appointment.appointmentNumber}
                            </strong>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Patient</span>
                            <strong>
                                {appointment.patientName}
                            </strong>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Department</span>
                            <strong>
                                {appointment.departmentName}
                            </strong>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Date</span>
                            <strong>
                                {appointment.appointmentDate}
                            </strong>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Time</span>
                            <strong>
                                {appointment.appointmentTime}
                            </strong>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Reason</span>
                            <strong>
                                {appointment.reason}
                            </strong>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Symptoms</span>
                            <strong>
                                {appointment.symptoms || "None"}
                            </strong>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Status</span>

                            <span
                                className={`doctor-appointment-status doctor-appointment-status-${String(
                                    appointment.status
                                ).toLowerCase()}`}
                            >
                                {appointment.status}
                            </span>
                        </div>

                        <div className="doctor-detail-row">
                            <span>Remarks</span>
                            <strong>
                                {appointment.remarks || "None"}
                            </strong>
                        </div>

                    </div>


                    <div className="doctor-appointment-actions-section">

                        {appointment.status === "BOOKED" && (

                            <button
                                className="doctor-confirm-button"
                                disabled={actionLoading}
                                onClick={handleConfirm}
                            >
                                {actionLoading
                                    ? "Processing..."
                                    : "Confirm Appointment"}
                            </button>

                        )}


                        {appointment.status === "CONFIRMED" && (

                            <button
                                className="doctor-complete-button"
                                disabled={actionLoading}
                                onClick={handleComplete}
                            >
                                {actionLoading
                                    ? "Processing..."
                                    : "Complete Appointment"}
                            </button>

                        )}

                    </div>


                    {appointment.status === "COMPLETED" && (

                        <form
                            className="doctor-remarks-card"
                            onSubmit={handleRemarks}
                        >

                            <h2>
                                Consultation Remarks
                            </h2>

                            <textarea
                                value={remarks}
                                onChange={(event) =>
                                    setRemarks(
                                        event.target.value
                                    )
                                }
                                maxLength="1000"
                                placeholder="Enter consultation remarks..."
                                required
                            />

                            <div className="doctor-remarks-actions">

                                <button
                                    type="submit"
                                    className="doctor-save-remarks-button"
                                    disabled={
                                        actionLoading
                                    }
                                >
                                    {actionLoading
                                        ? "Saving..."
                                        : "Save Remarks"}
                                </button>

                            </div>

                        </form>

                    )}

                </div>

            </main>

        </div>
    );
}

export default DoctorAppointmentDetails;