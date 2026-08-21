import { NavLink } from "react-router-dom";

import "../../styles/patientSidebar.css";

function PatientSidebar({ isOpen, onClose }) {

    return (
        <>
            {isOpen && (
                <div
                    className="patient-sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside
                className={`patient-sidebar ${
                    isOpen
                        ? "patient-sidebar-open"
                        : ""
                }`}
            >

                <div className="patient-sidebar-logo">

                    <h2>HMS</h2>

                    <p>
                        Hospital Management
                    </p>

                </div>


                <nav className="patient-sidebar-nav">

                    <NavLink
                        to="/patient/dashboard"
                        onClick={onClose}
                    >
                        Dashboard
                    </NavLink>


                    <NavLink
                        to="/patient/appointments"
                        onClick={onClose}
                    >
                        My Appointments
                    </NavLink>


                    <NavLink
                        to="/patient/profile"
                        onClick={onClose}
                    >
                        Profile
                    </NavLink>

                </nav>

            </aside>
        </>
    );
}

export default PatientSidebar;