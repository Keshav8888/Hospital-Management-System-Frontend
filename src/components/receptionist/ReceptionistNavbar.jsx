import "../../styles/receptionistNavbar.css";

function ReceptionistNavbar({ onMenuClick }) {

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

            <div className="receptionist-navbar-user">
                Receptionist
            </div>

        </header>
    );
}

export default ReceptionistNavbar;