import { NavLink } from "react-router-dom";

import "../../styles/doctorSidebar.css";

function DoctorSidebar({ isOpen, onClose }) {

    return (
        <>
            {isOpen && (
                <div
                    className="doctor-sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside
                className={`doctor-sidebar ${
                    isOpen
                        ? "doctor-sidebar-open"
                        : ""
                }`}
            >

                <div className="doctor-sidebar-logo">

                    <h2>HMS</h2>

                    <p>
                        Hospital Management
                    </p>

                </div>


                <nav className="doctor-sidebar-nav">

                    <NavLink
                        to="/doctor/dashboard"
                        onClick={onClose}
                    >
                        Dashboard
                    </NavLink>


                    <NavLink
                        to="/doctor/appointments"
                        onClick={onClose}
                    >
                        Appointments
                    </NavLink>


                    <NavLink
                        to="/doctor/appointments/today"
                        onClick={onClose}
                    >
                        Today's Appointments
                    </NavLink>


                    <NavLink
                        to="/doctor/appointments/history"
                        onClick={onClose}
                    >
                        History
                    </NavLink>


                    <NavLink
                        to="/doctor/profile"
                        onClick={onClose}
                    >
                        Profile
                    </NavLink>

                </nav>

            </aside>
        </>
    );
}

export default DoctorSidebar;