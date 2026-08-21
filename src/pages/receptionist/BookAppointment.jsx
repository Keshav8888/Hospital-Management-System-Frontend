import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getReceptionistDoctors,bookReceptionistAppointment } from "../../services/receptionistAppointmentService";

import { getReceptionistPatients } from "../../services/receptionistPatientService";

import { getReceptionistActiveDepartments } from "../../services/departmentService";

import "../../styles/bookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientId: "",
    departmentId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    symptoms: "",
  });

  const [loading, setLoading] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");

        const [patientsData, departmentsData] =
        await Promise.all([
        getReceptionistPatients(
            "",
            0,
            100,
            "firstName",
            "asc"
        ),
        getReceptionistActiveDepartments()
    ]);

        setPatients(patientsData.content || []);

        setDepartments(departmentsData || []);
      } catch (error) {
        console.error("Failed to load booking data:", error);

        setError("Unable to load patients and departments.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadDoctors = async () => {
      if (!formData.departmentId) {
        setDoctors([]);

        return;
      }

      try {
        setLoadingDoctors(true);

        const data = await getReceptionistDoctors(formData.departmentId);

        setDoctors(data || []);
      } catch (error) {
        console.error("Failed to load doctors:", error);

        setError("Unable to load doctors.");

        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    };

    loadDoctors();
  }, [formData.departmentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
      ...(name === "departmentId"
        ? { doctorId: "" }
        : {})
    }));

    if (name === "departmentId") {
      setFormData((previousData) => ({
        ...previousData,
        departmentId: value,
        doctorId: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await bookReceptionistAppointment({
        patientId: Number(formData.patientId),

        doctorId: Number(formData.doctorId),

        departmentId: Number(formData.departmentId),

        appointmentDate: formData.appointmentDate,

        appointmentTime: formData.appointmentTime,

        reason: formData.reason,

        symptoms: formData.symptoms,
      });

      setSuccess("Appointment booked successfully.");

      setTimeout(() => {
        navigate("/receptionist/appointments");
      }, 1000);
    } catch (error) {
      console.error("Failed to book appointment:", error);

      setError(error.response?.data?.message || "Unable to book appointment.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="book-appointment-message">Loading booking form...</div>
    );
  }

  return (
    <div className="book-appointment-page">
      <div className="book-appointment-container">
        <div className="book-appointment-header">
          <div>
            <h1>Book Appointment</h1>

            <p>Create an appointment for a patient</p>
          </div>

          <button
            type="button"
            className="appointment-back-button"
            onClick={() => navigate("/receptionist/appointments")}
          >
            ← Back to Appointments
          </button>
        </div>

        {error && <div className="appointment-form-error">{error}</div>}

        {success && <div className="appointment-form-success">{success}</div>}

        <form className="book-appointment-form" onSubmit={handleSubmit}>
          <div className="appointment-form-group">
            <label>Patient</label>

            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            >
              <option value="">Select Patient</option>

              {patients
                .filter((patient) => patient.status === "ACTIVE")
                .map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                    {" — "}
                    {patient.phone}
                  </option>
                ))}
            </select>
          </div>

          <div className="appointment-form-group">
            <label>Department</label>

            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="appointment-form-group">
            <label>Doctor</label>

            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              disabled={!formData.departmentId || loadingDoctors}
              required
            >
              <option value="">
                {loadingDoctors
                  ? "Loading doctors..."
                  : formData.departmentId
                    ? "Select Doctor"
                    : "Select Department First"}
              </option>

              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.firstName} {doctor.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="appointment-form-group">
            <label>Appointment Date</label>

            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>

          <div className="appointment-form-group">
            <label>Appointment Time</label>

            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="appointment-form-group appointment-full-width">
            <label>Reason</label>

            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              maxLength="500"
              placeholder="Reason for appointment"
              required
            />
          </div>

          <div className="appointment-form-group appointment-full-width">
            <label>Symptoms</label>

            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              maxLength="1000"
              placeholder="Describe patient symptoms"
            />
          </div>

          <div className="appointment-form-actions">
            <button
              type="button"
              className="appointment-cancel-button"
              onClick={() => navigate("/receptionist/appointments")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="appointment-submit-button"
              disabled={saving}
            >
              {saving ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
