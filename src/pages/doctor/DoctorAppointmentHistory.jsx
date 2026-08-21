import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorSidebar
    from "../../components/doctor/DoctorSidebar";

import DoctorNavbar
    from "../../components/doctor/DoctorNavbar";

import {
    getDoctorAppointmentHistory
} from "../../services/doctorAppointmentService";

import "../../styles/doctorAppointments.css";

function DoctorAppointmentHistory() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const loadHistory = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getDoctorAppointmentHistory();

            setAppointments(data || []);

        } catch (error) {

            console.error(
                "Failed to load appointment history:",
                error
            );

            setError(
                "Unable to load appointment history."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    if (loading) {
        return (
            <div className="doctor-appointments-message">
                Loading history...
            </div>
        );
    }

    if (error) {
        return (
            <div className="doctor-appointments-message">
                <h2>{error}</h2>
                <button onClick={loadHistory}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="doctor-appointments-page">

            <DoctorSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="doctor-appointments-main">

                <DoctorNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <div className="doctor-appointments-content">

                    <div className="doctor-appointments-header">

                        <div>
                            <h1>
                                Appointment History
                            </h1>

                            <p>
                                Completed appointments
                            </p>
                        </div>

                    </div>

                    <div className="doctor-appointments-table-container">

                        <table className="doctor-appointments-table">

                            <thead>
                                <tr>
                                    <th>Appointment No.</th>
                                    <th>Patient</th>
                                    <th>Date</th>
                                    <th>Reason</th>
                                    <th>Remarks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {appointments.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="doctor-appointments-empty"
                                        >
                                            No completed appointments.
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
                                                        appointment.appointmentDate
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.reason
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        appointment.remarks ||
                                                        "None"
                                                    }
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

export default DoctorAppointmentHistory;