import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import "../../styles/doctorDetails.css";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await api.get(`/api/admin/doctors/${id}`);
            console.log("FULL DOCTOR RESPONSE:", response.data);
            console.log("CONSULTATION FEE:", response.data.ConsultantionFee);
            console.log("CONSULTANTION FEE:", response.data.consultantionFee);        setDoctor(response.data);
      } catch (error) {
        console.error("Failed to load doctor:", error);

        setError("Unable to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  if (loading) {
    return <div className="doctor-details-message">Loading doctor...</div>;
  }

  if (error) {
    return <div className="doctor-details-message">{error}</div>;
  }

  if (!doctor) {
    return <div className="doctor-details-message">Doctor not found.</div>;
  }

  return (
    <div className="doctor-details-page">
      <div className="doctor-details-container">
        <div className="doctor-details-header">
          <div>
            <h1>Doctor Details</h1>

            <p>Doctor ID: {doctor.id}</p>
          </div>

          <button
            className="back-doctors-button"
            onClick={() => navigate("/admin/doctors")}
          >
            ← Back to Doctors
          </button>
        </div>

        <div className="doctor-details-card">
          <div className="doctor-detail-row">
            <span>Doctor ID</span>
            <strong>{doctor.id}</strong>
          </div>

          <div className="doctor-detail-row">
            <span>Name</span>
            <strong>
              {doctor.firstName} {doctor.lastName}
            </strong>
          </div>

          <div className="doctor-detail-row">
            <span>Department</span>
            <strong>{doctor.department}</strong>
          </div>

          <div className="doctor-detail-row">
            <span>Specialization</span>
            <strong>{doctor.specialization}</strong>
          </div>

          <div className="doctor-detail-row">
            <span>Qualification</span>
            <strong>{doctor.qualification}</strong>
          </div>

          <div className="doctor-detail-row">
            <span>Experience</span>
            <strong>{doctor.experience} years</strong>
          </div>

          <div className="doctor-detail-row">
            <span>Consultation Fee</span>
            <strong>
                ₹{String(doctor.ConsultantionFee)}
            </strong>
          </div>

          <div className="doctor-detail-row">
            <span>Phone</span>
            <strong>{doctor.phone}</strong>
          </div>

          <div className="doctor-detail-row">
            <span>Email</span>
            <strong>{doctor.email}</strong>
          </div>

          <div className="doctor-detail-row">
            <span>Status</span>

            <span
              className={`doctor-status ${
                doctor.status === "ACTIVE"
                  ? "doctor-status-active"
                  : "doctor-status-inactive"
              }`}
            >
              {doctor.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
