import "../../styles/adminNavbar.css";

function AdminNavbar({ onMenuClick }) {

    return (
        <header className="admin-navbar">

            <button
                className="mobile-menu-button"
                onClick={onMenuClick}
                aria-label="Open menu"
            >
                ☰
            </button>

            <div className="navbar-title">
                Hospital Management System
            </div>

            <div className="navbar-user">
                Admin
            </div>

        </header>
    );
}

export default AdminNavbar;