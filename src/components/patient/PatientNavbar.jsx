import "../../styles/patientNavbar.css";

function PatientNavbar({ onMenuClick }) {

    return (
        <header className="patient-navbar">

            <button
                className="patient-mobile-menu-button"
                onClick={onMenuClick}
                aria-label="Open menu"
            >
                ☰
            </button>


            <div className="patient-navbar-title">
                Hospital Management System
            </div>


            <div className="patient-navbar-user">
                Patient
            </div>

        </header>
    );
}

export default PatientNavbar;