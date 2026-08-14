import { useEffect, useState } from "react";
import { getDoctors } from "../../services/doctorService";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "../../styles/adminDoctors.css";
import api from "../../services/api";

function AdminDoctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(0);

  const [size] = useState(10);

  const [sortBy, setSortBy] = useState("firstName");

  const [sortDir, setSortDir] = useState("asc");

  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDoctors(keyword, page, size, sortBy, sortDir);

      setDoctors(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load doctors:", error);

      setError("Unable to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [page, sortBy, sortDir]);

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(0);

    loadDoctors();
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
      "Are you sure you want to deactivate this doctor?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/api/admin/doctors/${id}`);

      await loadDoctors();
    } catch (error) {
      console.error("Failed to deactivate doctor:", error);

      setError(error.response?.data?.message || "Unable to deactivate doctor.");
    }
  };

  if (loading) {
    return <h2>Loading doctors...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="doctors-page">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="doctors-main">
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="doctors-content">
          <div className="doctors-header">
            <div>
              <h1>Doctors</h1>

              <p className="doctors-subtitle">Manage hospital doctors</p>
            </div>

            <button
              className="add-doctor-button"
              onClick={() => navigate("/admin/doctors/add")}
            >
              + Add Doctor
            </button>
          </div>

          {/* Search */}

          <div className="doctors-toolbar">
            <form className="doctor-search-form" onSubmit={handleSearch}>
              <input
                className="doctor-search-input"
                type="text"
                placeholder="Search by name, phone, specialization or email"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              <button className="doctor-search-button" type="submit">
                Search
              </button>
            </form>
          </div>

          {/* Table */}

          <div className="doctors-table-container">
            <table className="doctors-table">
              <thead>
                <tr>
                  <th>ID</th>

                  <th
                    className="sortable-header"
                    onClick={() => handleSort("firstName")}
                  >
                    Name
                  </th>

                  <th>Department</th>

                  <th>Specialization</th>

                  <th>Qualification</th>

                  <th
                    className="sortable-header"
                    onClick={() => handleSort("experience")}
                  >
                    Experience
                  </th>

                  <th
                    className="sortable-header"
                    onClick={() => handleSort("phone")}
                  >
                    Phone
                  </th>

                  <th>Email</th>

                  <th>Status</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="doctors-message">
                      No doctors found.
                    </td>
                  </tr>
                ) : (
                  doctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>{doctor.id}</td>

                      <td>
                        {doctor.firstName} {doctor.lastName}
                      </td>

                      <td>{doctor.department}</td>

                      <td>{doctor.specialization}</td>

                      <td>{doctor.qualification}</td>

                      <td>{doctor.experience}</td>

                      <td>{doctor.phone}</td>

                      <td>{doctor.email}</td>

                      <td>
                        <span
                          className={`status-badge ${
                            doctor.status === "ACTIVE"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {doctor.status}
                        </span>
                      </td>

                      <td>
                        <div className="doctor-actions">
                          <button
                            className="view-button"
                            onClick={() =>
                              navigate(`/admin/doctors/${doctor.id}`)
                            }
                          >
                            View
                          </button>

                          <button
                            className="edit-button"
                            onClick={() =>
                              navigate(`/admin/doctors/${doctor.id}/edit`)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="deactivate-button"
                            onClick={() => handleDeactivate(doctor.id)}
                            disabled={doctor.status === "INACTIVE"}
                          >
                            {doctor.status === "INACTIVE"
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

            {/* Pagination */}

            <div className="doctors-pagination">
              <span>
                Page {page + 1} of {totalPages}
              </span>

              <div className="pagination-buttons">
                <button
                  className="pagination-button"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>

                <button
                  className="pagination-button"
                  disabled={page >= totalPages - 1}
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

export default AdminDoctors;
