import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
  getReceptionists,
  deactivateReceptionist,
} from "../../services/receptionistService";

import "../../styles/adminReceptionists.css";

function AdminReceptionists() {
  const navigate = useNavigate();

  const [receptionists, setReceptionists] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(0);

  const [size] = useState(10);

  const [sortBy, setSortBy] = useState("firstName");

  const [sortDir, setSortDir] = useState("asc");

  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadReceptionists = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReceptionists(keyword, page, size, sortBy, sortDir);

      setReceptionists(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error("Failed to load receptionists:", error);

      setError("Unable to load receptionists.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceptionists();
  }, [page, sortBy, sortDir]);

  const handleSearch = (event) => {
    event.preventDefault();

    setPage(0);

    loadReceptionists();
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }

    setPage(0);
  };

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this receptionist?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deactivateReceptionist(id);

      await loadReceptionists();
    } catch (error) {
      console.error("Failed to deactivate receptionist:", error);

      setError(
        error.response?.data?.message || "Unable to deactivate receptionist.",
      );
    }
  };

  const getStatusClass = (status) => {
    return status === "ACTIVE"
      ? "receptionist-status receptionist-status-active"
      : "receptionist-status receptionist-status-inactive";
  };

  if (loading) {
    return (
      <div className="receptionists-message">Loading receptionists...</div>
    );
  }

  if (error) {
    return (
      <div className="receptionists-message">
        <h2>{error}</h2>

        <button onClick={loadReceptionists}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="receptionists-page">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="receptionists-main">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="receptionists-content">
          <div className="receptionists-header">
            <div>
              <h1>Receptionists</h1>

              <p>Manage hospital receptionists</p>
            </div>

            <button
              className="add-receptionist-button"
              onClick={() => navigate("/admin/receptionists/add")}
            >
              + Add Receptionist
            </button>
          </div>

          <div className="receptionists-toolbar">
            <form className="receptionist-search-form" onSubmit={handleSearch}>
              <input
                className="receptionist-search-input"
                type="text"
                placeholder="Search by name, phone or email"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />

              <button className="receptionist-search-button" type="submit">
                Search
              </button>
            </form>
          </div>

          <div className="receptionists-table-container">
            <table className="receptionists-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th
                    className="sortable-header"
                    onClick={() => handleSort("firstName")}
                  >
                    Name
                  </th>

                  <th>Gender</th>

                  <th
                    className="sortable-header"
                    onClick={() => handleSort("dateOfBirth")}
                  >
                    Date of Birth
                  </th>

                  <th>Phone</th>

                  <th>Email</th>

                  <th>Status</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {receptionists.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="receptionists-empty">
                      No receptionists found.
                    </td>
                  </tr>
                ) : (
                  receptionists.map((receptionist) => (
                    <tr key={receptionist.id}>
                      <td>{receptionist.id}</td>

                      <td>
                        {receptionist.firstName} {receptionist.lastName}
                      </td>

                      <td>{receptionist.gender}</td>

                      <td>{receptionist.dateOfBirth}</td>

                      <td>{receptionist.phone}</td>

                      <td>{receptionist.email}</td>

                      <td>
                        <span className={getStatusClass(receptionist.status)}>
                          {receptionist.status}
                        </span>
                      </td>

                      <td>
                        <div className="receptionist-actions">
                          <button
                            className="view-button"
                            onClick={() =>
                              navigate(
                                `/admin/receptionists/${receptionist.id}`,
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="edit-button"
                            onClick={() =>
                              navigate(
                                `/admin/receptionists/${receptionist.id}/edit`,
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="deactivate-button"
                            disabled={receptionist.status === "INACTIVE"}
                            onClick={() => handleDeactivate(receptionist.id)}
                          >
                            {receptionist.status === "INACTIVE"
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

            <div className="receptionists-pagination">
              <span>
                Page {page + 1} of {totalPages}
              </span>

              <div>
                <button
                  className="pagination-button"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>

                <button
                  className="pagination-button"
                  disabled={totalPages === 0 || page >= totalPages - 1}
                  onClick={() => setPage(page + 1)}
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

export default AdminReceptionists;
