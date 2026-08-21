import "../../styles/doctorNavbar.css";

function DoctorNavbar({ onMenuClick }) {

    return (
        <header className="doctor-navbar">

            <button
                className="doctor-mobile-menu-button"
                onClick={onMenuClick}
                aria-label="Open menu"
            >
                ☰
            </button>


            <div className="doctor-navbar-title">
                Hospital Management System
            </div>


            <div className="doctor-navbar-user">
                Doctor
            </div>

        </header>
    );
}

export default DoctorNavbar;