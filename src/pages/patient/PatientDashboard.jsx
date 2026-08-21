import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientSidebar from "../../components/patient/PatientSidebar";

import PatientNavbar from "../../components/patient/PatientNavbar";

import { getMyPatientAppointments } from "../../services/patientAppointmentService";

import "../../styles/patientDashboard.css";

function PatientDashboard() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {

        const loadAppointments = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getMyPatientAppointments();

                setAppointments(data || []);

            } catch (error) {

                console.error(
                    "Failed to load patient appointments:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);
            }
        };

        loadAppointments();

    }, []);


    const bookedCount =
        appointments.filter(
            (appointment) =>
                appointment.status === "BOOKED"
        ).length;

    const confirmedCount =
        appointments.filter(
            (appointment) =>
                appointment.status === "CONFIRMED"
        ).length;

    const completedCount =
        appointments.filter(
            (appointment) =>
                appointment.status === "COMPLETED"
        ).length;

    const upcomingAppointments =
        appointments.filter(
            (appointment) =>
                appointment.status === "BOOKED" ||
                appointment.status === "CONFIRMED"
        );


    return (

        <div className="patient-dashboard-page">

            <PatientSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <main className="patient-dashboard-main">

                <PatientNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <div className="patient-dashboard-content">

                    <div className="patient-dashboard-header">

                        <div>

                            <h1>
                                Patient Dashboard
                            </h1>

                            <p>
                                Manage your appointments and profile
                            </p>

                        </div>

                    </div>


                    {error && (
                        <div className="patient-dashboard-error">
                            {error}
                        </div>
                    )}


                    <div className="patient-stats-grid">

                        <div className="patient-stat-card">

                            <span>
                                Total Appointments
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : appointments.length}
                            </strong>

                        </div>


                        <div className="patient-stat-card">

                            <span>
                                Booked
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : bookedCount}
                            </strong>

                        </div>


                        <div className="patient-stat-card">

                            <span>
                                Confirmed
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : confirmedCount}
                            </strong>

                        </div>


                        <div className="patient-stat-card">

                            <span>
                                Completed
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : completedCount}
                            </strong>

                        </div>

                    </div>


                    <div className="patient-dashboard-section">

                        <div className="patient-section-header">

                            <div>

                                <h2>
                                    Quick Actions
                                </h2>

                                <p>
                                    Manage your hospital activities
                                </p>

                            </div>

                        </div>


                        <div className="patient-quick-actions">

                            <button
                                className="patient-action-card"
                                onClick={() =>
                                    navigate(
                                        "/patient/appointments/book"
                                    )
                                }
                            >

                                <span className="patient-action-icon">
                                    +
                                </span>

                                <span className="patient-action-title">
                                    Book Appointment
                                </span>

                                <span className="patient-action-description">
                                    Schedule a new appointment
                                </span>

                            </button>


                            <button
                                className="patient-action-card"
                                onClick={() =>
                                    navigate(
                                        "/patient/appointments"
                                    )
                                }
                            >

                                <span className="patient-action-icon">
                                    📅
                                </span>

                                <span className="patient-action-title">
                                    My Appointments
                                </span>

                                <span className="patient-action-description">
                                    View and manage your appointments
                                </span>

                            </button>


                            <button
                                className="patient-action-card"
                                onClick={() =>
                                    navigate(
                                        "/patient/profile"
                                    )
                                }
                            >

                                <span className="patient-action-icon">
                                    👤
                                </span>

                                <span className="patient-action-title">
                                    My Profile
                                </span>

                                <span className="patient-action-description">
                                    View and update your information
                                </span>

                            </button>

                        </div>

                    </div>


                    <div className="patient-dashboard-section">

                        <div className="patient-section-header">

                            <div>

                                <h2>
                                    Upcoming Appointments
                                </h2>

                                <p>
                                    Your booked and confirmed appointments
                                </p>

                            </div>

                        </div>


                        {loading ? (

                            <div className="patient-dashboard-empty">
                                Loading appointments...
                            </div>

                        ) : upcomingAppointments.length === 0 ? (

                            <div className="patient-dashboard-empty">
                                No upcoming appointments.
                            </div>

                        ) : (

                            <div className="patient-upcoming-list">

                                {upcomingAppointments
                                    .slice(0, 5)
                                    .map(
                                        (appointment) => (

                                            <div
                                                className="patient-upcoming-card"
                                                key={
                                                    appointment.id
                                                }
                                            >

                                                <div>

                                                    <strong>
                                                        {
                                                            appointment.doctorName
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            appointment.departmentName
                                                        }
                                                    </span>

                                                </div>


                                                <div>

                                                    <strong>
                                                        {
                                                            appointment.appointmentDate
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            appointment.appointmentTime
                                                        }
                                                    </span>

                                                </div>


                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/patient/appointments/${appointment.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </div>

                                        )
                                    )}

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default PatientDashboard;