import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReceptionistSidebar from "../../components/receptionist/ReceptionistSidebar";
import ReceptionistNavbar from "../../components/receptionist/ReceptionistNavbar";
import api from "../../services/api";
import "../../styles/receptionistDashboard.css";
import {
  getDashboardGreeting,
  getLoggedInFirstName,
} from "../../utils/dashboardGreeting";

function ReceptionistDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const patientsResponse = await api.get("/api/receptionist/patients", {
          params: {
            page: 0,
            size: 1,
            sortBy: "firstName",
            sortDir: "asc",
          },
        });

        const appointmentsResponse = await api.get(
          "/api/receptionist/appointments",
          {
            params: {
              page: 0,
              size: 1,
              sortBy: "appointmentDate",
              sortDir: "asc",
            },
          },
        );

        const todayResponse = await api.get(
          "/api/receptionist/appointments/today",
        );

        setTotalPatients(patientsResponse.data.totalElements || 0);

        setTotalAppointments(appointmentsResponse.data.totalElements || 0);

        setTodayAppointments(
          Array.isArray(todayResponse.data) ? todayResponse.data.length : 0,
        );
      } catch (error) {
        console.error("Failed to load receptionist dashboard:", error);

        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="receptionist-dashboard-page">
      <ReceptionistSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="receptionist-dashboard-main">
        <ReceptionistNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="receptionist-dashboard-content">
          <div className="receptionist-dashboard-header">
            <div>
              <h1>
                {getDashboardGreeting()}, {getLoggedInFirstName()}{" "}
              </h1>

              <p>Overview of reception activities</p>
            </div>
          </div>

          {error && <div className="receptionist-dashboard-error">{error}</div>}

          <div className="receptionist-stats-grid">
            <div className="receptionist-stat-card">
              <div className="receptionist-stat-title">Total Patients</div>

              <div className="receptionist-stat-value">
                {loading ? "..." : totalPatients}
              </div>
            </div>

            <div className="receptionist-stat-card">
              <div className="receptionist-stat-title">Total Appointments</div>

              <div className="receptionist-stat-value">
                {loading ? "..." : totalAppointments}
              </div>
            </div>

            <div className="receptionist-stat-card">
              <div className="receptionist-stat-title">
                Today's Appointments
              </div>

              <div className="receptionist-stat-value">
                {loading ? "..." : todayAppointments}
              </div>
            </div>
          </div>

          <div className="receptionist-dashboard-section">
            <div className="receptionist-section-header">
              <div>
                <h2>Quick Actions</h2>

                <p>Frequently used receptionist operations</p>
              </div>
            </div>

            <div className="receptionist-quick-actions">
              <button
                className="receptionist-action-card"
                onClick={() => navigate("/receptionist/appointments/book")}
              >
                <span className="receptionist-action-icon">+</span>

                <span className="receptionist-action-title">
                  Book Appointment
                </span>

                <span className="receptionist-action-description">
                  Create a new patient appointment
                </span>
              </button>

              <button
                className="receptionist-action-card"
                onClick={() => navigate("/receptionist/appointments")}
              >
                <span className="receptionist-action-icon">📅</span>

                <span className="receptionist-action-title">
                  Manage Appointments
                </span>

                <span className="receptionist-action-description">
                  View, reschedule or cancel appointments
                </span>
              </button>

              <button
                className="receptionist-action-card"
                onClick={() => navigate("/receptionist/patients")}
              >
                <span className="receptionist-action-icon">👤</span>

                <span className="receptionist-action-title">
                  Manage Patients
                </span>

                <span className="receptionist-action-description">
                  Register and manage patient records
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReceptionistDashboard;
