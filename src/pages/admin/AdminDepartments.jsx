import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
    getDepartments,
    deactivateDepartment
} from "../../services/departmentService";

import "../../styles/adminDepartments.css";

function AdminDepartments() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(0);

    const [size] = useState(10);

    const [sortBy, setSortBy] = useState("name");

    const [sortDir, setSortDir] = useState("asc");

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const loadDepartments = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getDepartments(
                keyword,
                page,
                size,
                sortBy,
                sortDir
            );

            setDepartments(data.content || []);

            setTotalPages(
                data.totalPages || 0
            );

        } catch (error) {

            console.error(
                "Failed to load departments:",
                error
            );

            setError(
                "Unable to load departments."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadDepartments();

    }, [page, sortBy, sortDir]);


    const handleSearch = (event) => {

        event.preventDefault();

        setPage(0);

        loadDepartments();
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
            "Are you sure you want to deactivate this department?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deactivateDepartment(id);

            await loadDepartments();

        } catch (error) {

            console.error(
                "Failed to deactivate department:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to deactivate department."
            );
        }
    };


    const getStatusClass = (status) => {

        return status === "ACTIVE"
            ? "department-status department-status-active"
            : "department-status department-status-inactive";
    };


    if (loading) {

        return (
            <div className="departments-message">
                Loading departments...
            </div>
        );
    }


    if (error) {

        return (
            <div className="departments-message">

                <h2>{error}</h2>

                <button onClick={loadDepartments}>
                    Try Again
                </button>

            </div>
        );
    }


    return (

        <div className="departments-page">

            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />


            <main className="departments-main">

                <AdminNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="departments-content">

                    <div className="departments-header">

                        <div>

                            <h1>
                                Departments
                            </h1>

                            <p>
                                Manage hospital departments
                            </p>

                        </div>


                        <button
                            className="add-department-button"
                            onClick={() =>
                                navigate(
                                    "/admin/departments/add"
                                )
                            }
                        >
                            + Add Department
                        </button>

                    </div>


                    <div className="departments-toolbar">

                        <form
                            className="department-search-form"
                            onSubmit={handleSearch}
                        >

                            <input
                                className="department-search-input"
                                type="text"
                                placeholder="Search by name or location"
                                value={keyword}
                                onChange={(event) =>
                                    setKeyword(
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                className="department-search-button"
                                type="submit"
                            >
                                Search
                            </button>

                        </form>

                    </div>


                    <div className="departments-table-container">

                        <table className="departments-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th
                                        className="sortable-header"
                                        onClick={() =>
                                            handleSort("name")
                                        }
                                    >
                                        Name
                                    </th>

                                    <th>Description</th>

                                    <th
                                        className="sortable-header"
                                        onClick={() =>
                                            handleSort("location")
                                        }
                                    >
                                        Location
                                    </th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {departments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="departments-empty"
                                        >
                                            No departments found.
                                        </td>

                                    </tr>

                                ) : (

                                    departments.map(
                                        (department) => (

                                            <tr
                                                key={
                                                    department.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        department.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        department.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        department.description ||
                                                        "—"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        department.location
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            getStatusClass(
                                                                department.status
                                                            )
                                                        }
                                                    >
                                                        {
                                                            department.status
                                                        }
                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="department-actions">

                                                        <button
                                                            className="view-button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/departments/${department.id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>


                                                        <button
                                                            className="edit-button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/departments/${department.id}/edit`
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            className="deactivate-button"
                                                            disabled={
                                                                department.status ===
                                                                "INACTIVE"
                                                            }
                                                            onClick={() =>
                                                                handleDeactivate(
                                                                    department.id
                                                                )
                                                            }
                                                        >
                                                            {
                                                                department.status ===
                                                                "INACTIVE"
                                                                    ? "Inactive"
                                                                    : "Deactivate"
                                                            }
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>


                        <div className="departments-pagination">

                            <span>
                                Page {page + 1} of{" "}
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

export default AdminDepartments;