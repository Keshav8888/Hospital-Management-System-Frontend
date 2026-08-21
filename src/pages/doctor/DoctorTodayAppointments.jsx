import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorSidebar
    from "../../components/doctor/DoctorSidebar";

import DoctorNavbar
    from "../../components/doctor/DoctorNavbar";

import {
    getDoctorTodaysAppointments
} from "../../services/doctorAppointmentService";

import "../../styles/doctorAppointments.css";

function DoctorTodayAppointments() {

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
                await getDoctorTodaysAppointments();

            setAppointments(data || []);

        } catch (error) {

            console.error(
                "Failed to load today's appointments:",
                error
            );

            setError(
                "Unable to load today's appointments."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadAppointments();

    }, []);


    const getStatusClass = (status) => {

        return `doctor-appointment-status doctor-appointment-status-${String(
            status
        ).toLowerCase()}`;
    };


    if (loading) {

        return (
            <div className="doctor-appointments-message">
                Loading today's appointments...
            </div>
        );
    }


    if (error) {

        return (
            <div className="doctor-appointments-message">

                <h2>{error}</h2>

                <button
                    onClick={loadAppointments}
                >
                    Try Again
                </button>

            </div>
        );
    }


    return (

        <div className="doctor-appointments-page">

            <DoctorSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />


            <main className="doctor-appointments-main">

                <DoctorNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="doctor-appointments-content">

                    <div className="doctor-appointments-header">

                        <div>

                            <h1>
                                Today's Appointments
                            </h1>

                            <p>
                                Patients scheduled for today
                            </p>

                        </div>

                    </div>


                    <div className="doctor-appointments-table-container">

                        <table className="doctor-appointments-table">

                            <thead>

                                <tr>

                                    <th>
                                        Appointment No.
                                    </th>

                                    <th>
                                        Patient
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Reason
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
                                            colSpan="6"
                                            className="doctor-appointments-empty"
                                        >
                                            No appointments scheduled
                                            for today.
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
                                                        appointment.patientName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.appointmentTime
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.reason
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

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/doctor/appointments/${appointment.id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>

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

export default DoctorTodayAppointments;