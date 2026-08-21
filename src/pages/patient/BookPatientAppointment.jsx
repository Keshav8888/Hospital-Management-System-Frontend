import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientSidebar
    from "../../components/patient/PatientSidebar";

import PatientNavbar
    from "../../components/patient/PatientNavbar";

import {
    bookPatientAppointment,
    getPatientDoctors,
    getPatientDepartments
} from "../../services/patientAppointmentService";

import "../../styles/bookPatientAppointment.css";

function BookPatientAppointment() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        doctorId: "",
        departmentId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        symptoms: ""
    });

    const [loading, setLoading] = useState(true);
    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {

        const loadDepartments = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getPatientDepartments();

                setDepartments(data || []);

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

        loadDepartments();

    }, []);


    useEffect(() => {

        const loadDoctors = async () => {

            if (!formData.departmentId) {

                setDoctors([]);

                return;
            }

            try {

                setLoadingDoctors(true);
                setError("");

                const data =
                    await getPatientDoctors(
                        formData.departmentId
                    );

                setDoctors(data || []);

            } catch (error) {

                console.error(
                    "Failed to load doctors:",
                    error
                );

                setError(
                    "Unable to load doctors."
                );

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
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            await bookPatientAppointment({
                doctorId: Number(
                    formData.doctorId
                ),

                departmentId: Number(
                    formData.departmentId
                ),

                appointmentDate:
                    formData.appointmentDate,

                appointmentTime:
                    formData.appointmentTime,

                reason:
                    formData.reason,

                symptoms:
                    formData.symptoms
            });

            setSuccess(
                "Appointment booked successfully."
            );

            setTimeout(() => {

                navigate(
                    "/patient/appointments"
                );

            }, 1000);

        } catch (error) {

            console.error(
                "Failed to book appointment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to book appointment."
            );

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div className="patient-book-message">
                Loading booking form...
            </div>
        );
    }


    return (

        <div className="patient-book-page">

            <PatientSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <main className="patient-book-main">

                <PatientNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <div className="patient-book-content">

                    <div className="patient-book-container">

                        <div className="patient-book-header">

                            <div>

                                <h1>
                                    Book Appointment
                                </h1>

                                <p>
                                    Schedule an appointment with a doctor
                                </p>

                            </div>

                            <button
                                type="button"
                                className="patient-book-back-button"
                                onClick={() =>
                                    navigate(
                                        "/patient/appointments"
                                    )
                                }
                            >
                                ← Back to Appointments
                            </button>

                        </div>


                        {error && (
                            <div className="patient-book-error">
                                {error}
                            </div>
                        )}


                        {success && (
                            <div className="patient-book-success">
                                {success}
                            </div>
                        )}


                        <form
                            className="patient-book-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="patient-book-group">

                                <label>
                                    Department
                                </label>

                                <select
                                    name="departmentId"
                                    value={
                                        formData.departmentId
                                    }
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Department
                                    </option>

                                    {departments.map(
                                        (department) => (

                                            <option
                                                key={
                                                    department.id
                                                }
                                                value={
                                                    department.id
                                                }
                                            >
                                                {
                                                    department.name
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            <div className="patient-book-group">

                                <label>
                                    Doctor
                                </label>

                                <select
                                    name="doctorId"
                                    value={
                                        formData.doctorId
                                    }
                                    onChange={handleChange}
                                    disabled={
                                        !formData.departmentId ||
                                        loadingDoctors
                                    }
                                    required
                                >

                                    <option value="">
                                        {loadingDoctors
                                            ? "Loading doctors..."
                                            : formData.departmentId
                                            ? "Select Doctor"
                                            : "Select Department First"}
                                    </option>

                                    {doctors.map(
                                        (doctor) => (

                                            <option
                                                key={
                                                    doctor.id
                                                }
                                                value={
                                                    doctor.id
                                                }
                                            >
                                                Dr.{" "}
                                                {
                                                    doctor.firstName
                                                }{" "}
                                                {
                                                    doctor.lastName
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            <div className="patient-book-group">

                                <label>
                                    Appointment Date
                                </label>

                                <input
                                    type="date"
                                    name="appointmentDate"
                                    value={
                                        formData.appointmentDate
                                    }
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="patient-book-group">

                                <label>
                                    Appointment Time
                                </label>

                                <input
                                    type="time"
                                    name="appointmentTime"
                                    value={
                                        formData.appointmentTime
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="patient-book-group patient-book-full">

                                <label>
                                    Reason
                                </label>

                                <input
                                    type="text"
                                    name="reason"
                                    value={
                                        formData.reason
                                    }
                                    onChange={handleChange}
                                    maxLength="500"
                                    placeholder="Reason for appointment"
                                    required
                                />

                            </div>


                            <div className="patient-book-group patient-book-full">

                                <label>
                                    Symptoms
                                </label>

                                <textarea
                                    name="symptoms"
                                    value={
                                        formData.symptoms
                                    }
                                    onChange={handleChange}
                                    maxLength="1000"
                                    placeholder="Describe your symptoms"
                                />

                            </div>


                            <div className="patient-book-actions">

                                <button
                                    type="button"
                                    className="patient-book-cancel"
                                    onClick={() =>
                                        navigate(
                                            "/patient/appointments"
                                        )
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="patient-book-submit"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Booking..."
                                        : "Book Appointment"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default BookPatientAppointment;