import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import "../../styles/doctorNavbar.css";

function DoctorNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();

    navigate("/");
  };
  return (
    <header className="doctor-navbar">
      <button
        className="doctor-mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="doctor-navbar-title">Hospital Management System</div>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
}

export default DoctorNavbar;
