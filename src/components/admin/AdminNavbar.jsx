import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import "../../styles/adminNavbar.css";

function AdminNavbar({ onMenuClick }) {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();

    navigate("/");
  };
  return (
    <header className="admin-navbar">
      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="navbar-title">Hospital Management System</div>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
}

export default AdminNavbar;
