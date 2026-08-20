import { NavLink } from "react-router-dom";

import "../../styles/receptionistSidebar.css";

function ReceptionistSidebar({ isOpen, onClose }) {

    return (
        <>
            {isOpen && (
                <div
                    className="receptionist-sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside
                className={`receptionist-sidebar ${
                    isOpen
                        ? "receptionist-sidebar-open"
                        : ""
                }`}
            >

                {/* Logo / Branding */}

                <div className="receptionist-sidebar-logo">

                    <h2>HMS</h2>

                    <p>
                        Hospital Management
                    </p>

                </div>


                {/* Navigation */}

                <nav className="receptionist-sidebar-nav">

                    <NavLink
                        to="/receptionist/dashboard"
                        onClick={onClose}
                    >
                        Dashboard
                    </NavLink>


                    <NavLink
                        to="/receptionist/patients"
                        onClick={onClose}
                    >
                        Patients
                    </NavLink>


                    <NavLink
                        to="/receptionist/appointments"
                        onClick={onClose}
                    >
                        Appointments
                    </NavLink>


                    <NavLink
                        to="/receptionist/profile"
                        onClick={onClose}
                    >
                        Profile
                    </NavLink>

                </nav>

            </aside>
        </>
    );
}

export default ReceptionistSidebar;