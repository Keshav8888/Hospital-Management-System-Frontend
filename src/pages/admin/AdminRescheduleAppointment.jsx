import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getAdminAppointmentById,
    rescheduleAdminAppointment
} from "../../services/appointmentService";

import "../../styles/adminRescheduleAppointment.css";

function AdminRescheduleAppointment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [formData, setFormData] = useState({
        appointmentDate: "",
        appointmentTime: ""
    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    useEffect(() => {

        const loadAppointment = async () => {

            try {

                const data =
                    await getAdminAppointmentById(id);

                setAppointment(data);

                setFormData({
                    appointmentDate:
                        data.appointmentDate || "",

                    appointmentTime:
                        data.appointmentTime
                            ? data.appointmentTime.substring(
                                  0,
                                  5
                              )
                            : ""
                });

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

        loadAppointment();

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

            await rescheduleAdminAppointment(
                id,
                formData
            );

            setSuccess(
                "Appointment rescheduled successfully."
            );

            setTimeout(() => {

                navigate(
                    `/admin/appointments/${id}`
                );

            }, 1000);

        } catch (error) {

            console.error(
                "Failed to reschedule appointment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to reschedule appointment."
            );

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div className="admin-reschedule-message">
                Loading appointment...
            </div>
        );
    }


    if (!appointment) {

        return (
            <div className="admin-reschedule-message">
                Appointment not found.
            </div>
        );
    }


    return (

        <div className="admin-reschedule-page">

            <div className="admin-reschedule-container">

                <div className="admin-reschedule-header">

                    <div>

                        <h1>
                            Reschedule Appointment
                        </h1>

                        <p>
                            {
                                appointment.appointmentNumber
                            }
                        </p>

                    </div>


                    <button
                        type="button"
                        className="appointment-back-button"
                        onClick={() =>
                            navigate(
                                `/admin/appointments/${id}`
                            )
                        }
                    >
                        ← Back to Appointment
                    </button>

                </div>


                <div className="appointment-summary">

                    <div>
                        <span>Patient</span>

                        <strong>
                            {
                                appointment.patientName
                            }
                        </strong>
                    </div>


                    <div>
                        <span>Doctor</span>

                        <strong>
                            {
                                appointment.doctorName
                            }
                        </strong>
                    </div>


                    <div>
                        <span>Department</span>

                        <strong>
                            {
                                appointment.departmentName
                            }
                        </strong>
                    </div>

                </div>


                {error && (
                    <div className="appointment-form-error">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="appointment-form-success">
                        {success}
                    </div>
                )}


                <form
                    className="admin-reschedule-form"
                    onSubmit={handleSubmit}
                >

                    <div className="appointment-form-group">

                        <label>
                            New Appointment Date
                        </label>

                        <input
                            type="date"
                            name="appointmentDate"
                            value={
                                formData.appointmentDate
                            }
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="appointment-form-group">

                        <label>
                            New Appointment Time
                        </label>

                        <input
                            type="time"
                            name="appointmentTime"
                            value={
                                formData.appointmentTime
                            }
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="admin-reschedule-actions">

                        <button
                            type="button"
                            className="appointment-cancel-button"
                            onClick={() =>
                                navigate(
                                    `/admin/appointments/${id}`
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="appointment-update-button"
                            disabled={
                                saving ||
                                appointment.status ===
                                    "CANCELLED" ||
                                appointment.status ===
                                    "COMPLETED"
                            }
                        >
                            {saving
                                ? "Rescheduling..."
                                : "Reschedule Appointment"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AdminRescheduleAppointment;