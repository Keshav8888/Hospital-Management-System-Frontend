import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import { getPatients, deactivatePatient } from "../../services/patientService";
import "../../styles/adminPatients.css";

function AdminPatients() {

    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(0);

    const [size] = useState(10);

    const [sortBy, setSortBy] = useState("firstName");

    const [sortDir, setSortDir] = useState("asc");

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const loadPatients = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getPatients(
                keyword,
                page,
                size,
                sortBy,
                sortDir
            );

            setPatients(data.content || []);
            setTotalPages(data.totalPages || 0);

        } catch (error) {

            console.error(
                "Failed to load patients:",
                error
            );

            setError("Unable to load patients.");

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadPatients();

    }, [page, sortBy, sortDir]);


    const handleSearch = (event) => {

        event.preventDefault();

        setPage(0);

        loadPatients();
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

    const handleDeactivate = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to deactivate this patient?"
    );

    if (!confirmed) {
        return;
    }

    try {

        setError("");

        await deactivatePatient(id);

        await loadPatients();

    } catch (error) {

        console.error(
            "Failed to deactivate patient:",
            error
        );

        setError(
            error.response?.data?.message ||
            "Unable to deactivate patient."
        );
    }
};


    const getStatusClass = (status) => {

        return status === "ACTIVE"
            ? "patient-status patient-status-active"
            : "patient-status patient-status-inactive";
    };


    if (loading) {

        return (
            <div className="patients-message">
                Loading patients...
            </div>
        );
    }


    if (error) {

        return (
            <div className="patients-message">

                <h2>{error}</h2>

                <button onClick={loadPatients}>
                    Try Again
                </button>

            </div>
        );
    }


    return (

        <div className="patients-page">

            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />


            <main className="patients-main">

                <AdminNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="patients-content">

                    <div className="patients-header">

                        <div>

                            <h1>Patients</h1>

                            <p>
                                Manage hospital patients
                            </p>

                        </div>

                    </div>


                    <div className="patients-toolbar">

                        <form
                            className="patient-search-form"
                            onSubmit={handleSearch}
                        >

                            <input
                                className="patient-search-input"
                                type="text"
                                placeholder="Search by name, phone or email"
                                value={keyword}
                                onChange={(event) =>
                                    setKeyword(
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                className="patient-search-button"
                                type="submit"
                            >
                                Search
                            </button>

                        </form>

                    </div>


                    <div className="patients-table-container">

                        <table className="patients-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th
                                        className="sortable-header"
                                        onClick={() =>
                                            handleSort(
                                                "firstName"
                                            )
                                        }
                                    >
                                        Name
                                    </th>

                                    <th>Gender</th>

                                    <th
                                        className="sortable-header"
                                        onClick={() =>
                                            handleSort(
                                                "dateOfBirth"
                                            )
                                        }
                                    >
                                        Date of Birth
                                    </th>

                                    <th>Phone</th>

                                    <th>Email</th>

                                    <th>Blood Group</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {patients.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="patients-empty"
                                        >
                                            No patients found.
                                        </td>

                                    </tr>

                                ) : (

                                    patients.map((patient) => (

                                        <tr key={patient.id}>

                                            <td>
                                                {patient.id}
                                            </td>

                                            <td>
                                                {patient.firstName}{" "}
                                                {patient.lastName}
                                            </td>

                                            <td>
                                                {patient.gender}
                                            </td>

                                            <td>
                                                {patient.dateOfBirth}
                                            </td>

                                            <td>
                                                {patient.phone}
                                            </td>

                                            <td>
                                                {patient.email}
                                            </td>

                                            <td>
                                                {patient.bloodGroup}
                                            </td>

                                            <td>

                                                <span
                                                    className={getStatusClass(
                                                        patient.status
                                                    )}
                                                >
                                                    {patient.status}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="patient-actions">

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/patients/${patient.id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/patients/${patient.id}/edit`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="deactivate-button"
                                                        disabled={
                                                            patient.status ===
                                                            "INACTIVE"
                                                        }
                                                         onClick={() =>
                                                            handleDeactivate(patient.id)
                                                        }
                                                    >
                                                        {patient.status ===
                                                        "INACTIVE"
                                                            ? "Inactive"
                                                            : "Deactivate"}
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>


                        <div className="patients-pagination">

                            <span>
                                Page {page + 1} of {totalPages}
                            </span>

                            <div>

                                <button
                                    className="pagination-button"
                                    disabled={page === 0}
                                    onClick={() =>
                                        setPage(page - 1)
                                    }
                                >
                                    Previous
                                </button>

                                <button
                                    className="pagination-button"
                                    disabled={
                                        totalPages === 0 ||
                                        page >= totalPages - 1
                                    }
                                    onClick={() =>
                                        setPage(page + 1)
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

export default AdminPatients;