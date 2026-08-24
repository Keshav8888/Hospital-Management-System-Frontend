import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import "../../styles/patientNavbar.css";

function PatientNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();

    navigate("/login");
  };
  return (
    <header className="patient-navbar">
      <button
        className="patient-mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="patient-navbar-title">Hospital Management System</div>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
}

export default PatientNavbar;
