import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getReceptionistAppointmentById,
    rescheduleReceptionistAppointment
} from "../../services/receptionistAppointmentService";

import "../../styles/receptionistRescheduleAppointment.css";

function ReceptionistRescheduleAppointment() {

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
                    await getReceptionistAppointmentById(id);

                setAppointment(data);

                setFormData({
                    appointmentDate:
                        data.appointmentDate || "",

                    appointmentTime:
                        data.appointmentTime
                            ? data.appointmentTime.substring(0, 5)
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

            await rescheduleReceptionistAppointment(
                id,
                formData
            );

            setSuccess(
                "Appointment rescheduled successfully."
            );

            setTimeout(() => {

                navigate(
                    `/receptionist/appointments/${id}`
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
            <div className="receptionist-reschedule-message">
                Loading appointment...
            </div>
        );
    }


    if (!appointment) {

        return (
            <div className="receptionist-reschedule-message">
                Appointment not found.
            </div>
        );
    }


    const cannotReschedule =
        appointment.status === "CANCELLED" ||
        appointment.status === "COMPLETED";


    return (

        <div className="receptionist-reschedule-page">

            <div className="receptionist-reschedule-container">

                <div className="receptionist-reschedule-header">

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
                                `/receptionist/appointments/${id}`
                            )
                        }
                    >
                        ← Back to Appointment
                    </button>

                </div>


                <div className="receptionist-appointment-summary">

                    <div>
                        <span>Patient</span>
                        <strong>
                            {appointment.patientName}
                        </strong>
                    </div>

                    <div>
                        <span>Doctor</span>
                        <strong>
                            {appointment.doctorName}
                        </strong>
                    </div>

                    <div>
                        <span>Department</span>
                        <strong>
                            {appointment.departmentName}
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
                    className="receptionist-reschedule-form"
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
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            onChange={handleChange}
                            required
                            disabled={cannotReschedule}
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
                            disabled={cannotReschedule}
                        />

                    </div>


                    <div className="receptionist-reschedule-actions">

                        <button
                            type="button"
                            className="appointment-cancel-button"
                            onClick={() =>
                                navigate(
                                    `/receptionist/appointments/${id}`
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
                                cannotReschedule
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

export default ReceptionistRescheduleAppointment;