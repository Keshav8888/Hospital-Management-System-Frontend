import { Link } from "react-router-dom";
import "../../styles/adminSidebar.css";

function AdminSidebar({ isOpen, onClose }) {

    return (
        <>
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside
                className={`admin-sidebar ${
                    isOpen ? "sidebar-open" : ""
                }`}
            >

                <div className="sidebar-logo">

                    <h2>HMS</h2>

                    <p>Hospital Management</p>

                </div>

                <nav className="sidebar-nav">

                    <Link
                        to="/admin/dashboard"
                        onClick={onClose}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/doctors"
                        onClick={onClose}
                    >
                        Doctors
                    </Link>

                    <Link
                        to="/admin/patients"
                        onClick={onClose}
                    >
                        Patients
                    </Link>

                    <Link
                        to="/admin/receptionists"
                        onClick={onClose}
                    >
                        Receptionists
                    </Link>

                    <Link
                        to="/admin/departments"
                        onClick={onClose}
                    >
                        Departments
                    </Link>

                    <Link
                        to="/admin/appointments"
                        onClick={onClose}
                    >
                        Appointments
                    </Link>

                </nav>

            </aside>
        </>
    );
}

export default AdminSidebar;