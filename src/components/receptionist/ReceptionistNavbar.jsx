import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import "../../styles/receptionistNavbar.css";

function ReceptionistNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();

    navigate("/");
  };
  return (
    <header className="receptionist-navbar">
      <button
        className="receptionist-mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="receptionist-navbar-title">
        Hospital Management System
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
}

export default ReceptionistNavbar;
