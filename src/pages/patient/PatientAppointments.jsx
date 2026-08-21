import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientSidebar
    from "../../components/patient/PatientSidebar";

import PatientNavbar
    from "../../components/patient/PatientNavbar";

import {
    getMyPatientAppointments,
    cancelMyPatientAppointment
} from "../../services/patientAppointmentService";

import "../../styles/patientAppointments.css";

function PatientAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const loadAppointments = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getMyPatientAppointments();

            setAppointments(data || []);

        } catch (error) {

            console.error(
                "Failed to load appointments:",
                error
            );

            setError(
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadAppointments();

    }, []);


    const handleCancel = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this appointment?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await cancelMyPatientAppointment(id);

            await loadAppointments();

        } catch (error) {

            console.error(
                "Failed to cancel appointment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to cancel appointment."
            );
        }
    };


    const getStatusClass = (status) => {

        return `patient-appointment-status patient-appointment-status-${String(
            status
        ).toLowerCase()}`;
    };


    if (loading) {

        return (
            <div className="patient-appointments-message">
                Loading appointments...
            </div>
        );
    }


    return (

        <div className="patient-appointments-page">

            <PatientSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />


            <main className="patient-appointments-main">

                <PatientNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="patient-appointments-content">

                    <div className="patient-appointments-header">

                        <div>

                            <h1>
                                My Appointments
                            </h1>

                            <p>
                                View and manage your appointments
                            </p>

                        </div>


                        <button
                            className="patient-book-button"
                            onClick={() =>
                                navigate(
                                    "/patient/appointments/book"
                                )
                            }
                        >
                            + Book Appointment
                        </button>

                    </div>


                    {error && (
                        <div className="patient-appointments-error">
                            {error}
                        </div>
                    )}


                    <div className="patient-appointments-table-container">

                        <table className="patient-appointments-table">

                            <thead>

                                <tr>

                                    <th>
                                        Appointment No.
                                    </th>

                                    <th>
                                        Doctor
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {appointments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="patient-appointments-empty"
                                        >
                                            No appointments found.
                                        </td>

                                    </tr>

                                ) : (

                                    appointments.map(
                                        (appointment) => (

                                            <tr
                                                key={
                                                    appointment.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        appointment.appointmentNumber
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.doctorName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.departmentName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.appointmentDate
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.appointmentTime
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={getStatusClass(
                                                            appointment.status
                                                        )}
                                                    >
                                                        {
                                                            appointment.status
                                                        }
                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="patient-appointment-actions">

                                                        <button
                                                            className="view-button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/patient/appointments/${appointment.id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>


                                                        <button
                                                            className="cancel-button"
                                                            disabled={
                                                                appointment.status !==
                                                                "BOOKED"
                                                            }
                                                            onClick={() =>
                                                                handleCancel(
                                                                    appointment.id
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default PatientAppointments;