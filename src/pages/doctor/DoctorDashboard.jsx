import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorSidebar from "../../components/doctor/DoctorSidebar";

import DoctorNavbar from "../../components/doctor/DoctorNavbar";

import { getDoctorDashboard } from "../../services/doctorDashboardService";

import "../../styles/doctorDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDoctorDashboard();

        setDashboard(data);
      } catch (error) {
        console.error("Failed to load doctor dashboard:", error);

        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="doctor-dashboard-message">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="doctor-dashboard-message">
        <h2>{error}</h2>

        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard-page">
      <DoctorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="doctor-dashboard-main">
        <DoctorNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="doctor-dashboard-content">
          <div className="doctor-dashboard-header">
            <div>
              <h1>Doctor Dashboard</h1>

              <p>Overview of your appointments</p>
            </div>
          </div>

          <div className="doctor-stats-grid">
            <div className="doctor-stat-card">
              <span className="doctor-stat-title">Today's Appointments</span>

              <strong className="doctor-stat-value">
                {dashboard.todaysAppointments}
              </strong>
            </div>

            <div className="doctor-stat-card">
              <span className="doctor-stat-title">Total Appointments</span>

              <strong className="doctor-stat-value">
                {dashboard.totalAppointments}
              </strong>
            </div>

            <div className="doctor-stat-card">
              <span className="doctor-stat-title">Booked</span>

              <strong className="doctor-stat-value">
                {dashboard.bookedAppointments}
              </strong>
            </div>

            <div className="doctor-stat-card">
              <span className="doctor-stat-title">Confirmed</span>

              <strong className="doctor-stat-value">
                {dashboard.confirmedAppointments}
              </strong>
            </div>

            <div className="doctor-stat-card">
              <span className="doctor-stat-title">Completed</span>

              <strong className="doctor-stat-value">
                {dashboard.completedAppointments}
              </strong>
            </div>

            <div className="doctor-stat-card">
              <span className="doctor-stat-title">Cancelled</span>

              <strong className="doctor-stat-value">
                {dashboard.cancelledAppointments}
              </strong>
            </div>
          </div>

          <div className="doctor-dashboard-section">
            <div className="doctor-section-header">
              <div>
                <h2>Quick Actions</h2>

                <p>Manage your appointments</p>
              </div>
            </div>

            <div className="doctor-quick-actions">
              <button
                className="doctor-action-card"
                onClick={() => navigate("/doctor/appointments/today")}
              >
                <span className="doctor-action-icon">📅</span>

                <span className="doctor-action-title">
                  Today's Appointments
                </span>

                <span className="doctor-action-description">
                  View patients scheduled for today
                </span>
              </button>

              <button
                className="doctor-action-card"
                onClick={() => navigate("/doctor/appointments")}
              >
                <span className="doctor-action-icon">📋</span>

                <span className="doctor-action-title">All Appointments</span>

                <span className="doctor-action-description">
                  View and manage your appointments
                </span>
              </button>

              <button
                className="doctor-action-card"
                onClick={() => navigate("/doctor/appointments/history")}
              >
                <span className="doctor-action-icon">🕒</span>

                <span className="doctor-action-title">Appointment History</span>

                <span className="doctor-action-description">
                  View completed appointment history
                </span>
              </button>

              <button
                className="doctor-action-card"
                onClick={() => navigate("/doctor/profile")}
              >
                <span className="doctor-action-icon">👤</span>

                <span className="doctor-action-title">My Profile</span>

                <span className="doctor-action-description">
                  View and update your profile
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DoctorDashboard;
