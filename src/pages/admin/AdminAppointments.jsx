import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
    getAdminAppointments,
    cancelAdminAppointment
} from "../../services/appointmentService";

import "../../styles/adminAppointments.css";

function AdminAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] =
        useState([]);

    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(0);

    const [size] = useState(10);

    const [sortBy, setSortBy] =
        useState("appointmentDate");

    const [sortDir, setSortDir] =
        useState("asc");

    const [totalPages, setTotalPages] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [sidebarOpen, setSidebarOpen] =
        useState(false);


    const loadAppointments = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getAdminAppointments(
                    keyword,
                    page,
                    size,
                    sortBy,
                    sortDir
                );

            setAppointments(
                data.content || []
            );

            setTotalPages(
                data.totalPages || 0
            );

        } catch (error) {

            console.error(
                "Failed to load appointments:",
                error
            );

            setError(
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadAppointments();

    }, [page, sortBy, sortDir]);


    const handleSearch = (event) => {

        event.preventDefault();

        setPage(0);

        loadAppointments();
    };


    const handleSort = (field) => {

        if (sortBy === field) {

            setSortDir(
                sortDir === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortBy(field);

            setSortDir("asc");
        }

        setPage(0);
    };


    const handleCancel = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this appointment?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await cancelAdminAppointment(id);

            await loadAppointments();

        } catch (error) {

            console.error(
                "Failed to cancel appointment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to cancel appointment."
            );
        }
    };


    const getStatusClass = (status) => {

        return `appointment-status appointment-status-${String(
            status
        ).toLowerCase()}`;
    };


    if (loading) {

        return (
            <div className="appointments-message">
                Loading appointments...
            </div>
        );
    }


    if (error) {

        return (
            <div className="appointments-message">

                <h2>{error}</h2>

                <button
                    onClick={loadAppointments}
                >
                    Try Again
                </button>

            </div>
        );
    }


    return (

        <div className="admin-appointments-page">

            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <main className="admin-appointments-main">

                <AdminNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="admin-appointments-content">

                    <div className="admin-appointments-header">

                        <div>

                            <h1>
                                Appointments
                            </h1>

                            <p>
                                Manage hospital appointments
                            </p>

                        </div>

                    </div>


                    <div className="appointments-toolbar">

                        <form
                            className="appointment-search-form"
                            onSubmit={handleSearch}
                        >

                            <input
                                type="text"
                                className="appointment-search-input"
                                placeholder="Search by appointment number, patient or doctor"
                                value={keyword}
                                onChange={(event) =>
                                    setKeyword(
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                type="submit"
                                className="appointment-search-button"
                            >
                                Search
                            </button>

                        </form>

                    </div>


                    <div className="appointments-table-container">

                        <table className="appointments-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>
                                        Appointment No.
                                    </th>

                                    <th>
                                        Patient
                                    </th>

                                    <th>
                                        Doctor
                                    </th>

                                    <th
                                        className="sortable-header"
                                        onClick={() =>
                                            handleSort(
                                                "appointmentDate"
                                            )
                                        }
                                    >
                                        Date
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    appointments.length ===
                                    0 ? (

                                        <tr>

                                            <td
                                                colSpan="9"
                                                className="appointments-empty"
                                            >
                                                No appointments
                                                found.
                                            </td>

                                        </tr>

                                    ) : (

                                        appointments.map(
                                            (appointment) => (

                                                <tr
                                                    key={
                                                        appointment.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            appointment.id
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            appointment.appointmentNumber
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            appointment.patientName
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            appointment.doctorName
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            appointment.appointmentDate
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            appointment.appointmentTime
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            appointment.departmentName
                                                        }
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={getStatusClass(
                                                                appointment.status
                                                            )}
                                                        >
                                                            {
                                                                appointment.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div className="appointment-actions">

                                                            <button
                                                                className="view-button"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/appointments/${appointment.id}`
                                                                    )
                                                                }
                                                            >
                                                                View
                                                            </button>


                                                            <button
                                                                className="edit-button"
                                                                disabled={
                                                                    appointment.status ===
                                                                        "CANCELLED" ||
                                                                    appointment.status ===
                                                                        "COMPLETED"
                                                                }
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/appointments/${appointment.id}/reschedule`
                                                                    )
                                                                }
                                                            >
                                                                Reschedule
                                                            </button>


                                                            <button
                                                                className="deactivate-button"
                                                                disabled={
                                                                    appointment.status ===
                                                                        "CANCELLED" ||
                                                                    appointment.status ===
                                                                        "COMPLETED"
                                                                }
                                                                onClick={() =>
                                                                    handleCancel(
                                                                        appointment.id
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    appointment.status ===
                                                                    "CANCELLED"
                                                                        ? "Cancelled"
                                                                        : "Cancel"
                                                                }
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )
                                }

                            </tbody>

                        </table>


                        <div className="appointments-pagination">

                            <span>
                                Page{" "}
                                {page + 1} of{" "}
                                {totalPages}
                            </span>


                            <div>

                                <button
                                    className="pagination-button"
                                    disabled={
                                        page === 0
                                    }
                                    onClick={() =>
                                        setPage(
                                            page - 1
                                        )
                                    }
                                >
                                    Previous
                                </button>


                                <button
                                    className="pagination-button"
                                    disabled={
                                        totalPages === 0 ||
                                        page >=
                                            totalPages - 1
                                    }
                                    onClick={() =>
                                        setPage(
                                            page + 1
                                        )
                                    }
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminAppointments;