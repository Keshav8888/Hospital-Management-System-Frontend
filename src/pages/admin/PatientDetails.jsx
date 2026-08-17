// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import AdminSidebar from "../../components/admin/AdminSidebar";
// import AdminNavbar from "../../components/admin/AdminNavbar";

// import { getPatientById } from "../../services/patientService";

// import "../../styles/patientDetails.css";

// function PatientDetails() {

//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [patient, setPatient] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     useEffect(() => {

//         const loadPatient = async () => {

//             try {

//                 const data = await getPatientById(id);

//                 setPatient(data);

//             } catch (error) {

//                 console.error(
//                     "Failed to load patient:",
//                     error
//                 );

//                 setError("Unable to load patient details.");

//             } finally {

//                 setLoading(false);
//             }
//         };

//         loadPatient();

//     }, [id]);

//     if (loading) {
//         return (
//             <div className="patient-details-message">
//                 Loading patient...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="patient-details-message">
//                 {error}
//             </div>
//         );
//     }

//     if (!patient) {
//         return (
//             <div className="patient-details-message">
//                 Patient not found.
//             </div>
//         );
//     }

//     return (
//         <div className="patient-details-page">

//             <AdminSidebar
//                 isOpen={sidebarOpen}
//                 onClose={() => setSidebarOpen(false)}
//             />

//             <main className="patient-details-main">

//                 <AdminNavbar
//                     onMenuClick={() => setSidebarOpen(true)}
//                 />

//                 <div className="patient-details-content">

//                     <div className="patient-details-header">

//                         <div>
//                             <h1>Patient Details</h1>

//                             <p>
//                                 Patient ID: {patient.id}
//                             </p>
//                         </div>

//                         <button
//                             className="patient-back-button"
//                             onClick={() =>
//                                 navigate("/admin/patients")
//                             }
//                         >
//                             ← Back to Patients
//                         </button>

//                     </div>

//                     <div className="patient-details-card">

//                         <div className="patient-detail-row">
//                             <span>Patient ID</span>
//                             <strong>{patient.id}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Name</span>
//                             <strong>
//                                 {patient.firstName} {patient.lastName}
//                             </strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Email</span>
//                             <strong>{patient.email}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Gender</span>
//                             <strong>{patient.gender}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Date of Birth</span>
//                             <strong>{patient.dateOfBirth}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Phone</span>
//                             <strong>{patient.phone}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Blood Group</span>
//                             <strong>{patient.bloodGroup}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Emergency Contact</span>
//                             <strong>{patient.emergencyContact}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Address</span>
//                             <strong>{patient.address}</strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Allergies</span>
//                             <strong>
//                                 {patient.allergies || "None"}
//                             </strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Medical History</span>
//                             <strong>
//                                 {patient.medicalHistory || "None"}
//                             </strong>
//                         </div>

//                         <div className="patient-detail-row">
//                             <span>Status</span>

//                             <span
//                                 className={
//                                     patient.status === "ACTIVE"
//                                         ? "patient-status patient-status-active"
//                                         : "patient-status patient-status-inactive"
//                                 }
//                             >
//                                 {patient.status}
//                             </span>
//                         </div>

//                     </div>

//                 </div>

//             </main>

//         </div>
//     );
// }

// export default PatientDetails;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPatientById } from "../../services/patientService";

import "../../styles/patientDetails.css";

function PatientDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadPatient = async () => {

            try {

                const data = await getPatientById(id);

                setPatient(data);

            } catch (error) {

                console.error(
                    "Failed to load patient:",
                    error
                );

                setError(
                    "Unable to load patient details."
                );

            } finally {

                setLoading(false);
            }
        };

        loadPatient();

    }, [id]);

    if (loading) {

        return (
            <div className="patient-details-message">
                Loading patient...
            </div>
        );
    }

    if (error) {

        return (
            <div className="patient-details-message">
                {error}
            </div>
        );
    }

    if (!patient) {

        return (
            <div className="patient-details-message">
                Patient not found.
            </div>
        );
    }

    return (
        <div className="patient-details-page">

            <div className="patient-details-container">

                <div className="patient-details-header">

                    <div>

                        <h1>
                            Patient Details
                        </h1>

                        <p>
                            Patient ID: {patient.id}
                        </p>

                    </div>

                    <button
                        className="patient-back-button"
                        onClick={() =>
                            navigate("/admin/patients")
                        }
                    >
                        ← Back to Patients
                    </button>

                </div>


                <div className="patient-details-card">

                    <div className="patient-detail-row">
                        <span>Patient ID</span>
                        <strong>{patient.id}</strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Name</span>
                        <strong>
                            {patient.firstName}{" "}
                            {patient.lastName}
                        </strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Email</span>
                        <strong>{patient.email}</strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Gender</span>
                        <strong>{patient.gender}</strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Date of Birth</span>
                        <strong>{patient.dateOfBirth}</strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Phone</span>
                        <strong>{patient.phone}</strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Blood Group</span>
                        <strong>{patient.bloodGroup}</strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Emergency Contact</span>
                        <strong>
                            {patient.emergencyContact ||
                                "Not provided"}
                        </strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Address</span>
                        <strong>
                            {patient.address}
                        </strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Allergies</span>
                        <strong>
                            {patient.allergies ||
                                "None"}
                        </strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Medical History</span>
                        <strong>
                            {patient.medicalHistory ||
                                "None"}
                        </strong>
                    </div>


                    <div className="patient-detail-row">
                        <span>Status</span>

                        <span
                            className={
                                patient.status === "ACTIVE"
                                    ? "patient-status patient-status-active"
                                    : "patient-status patient-status-inactive"
                            }
                        >
                            {patient.status}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PatientDetails;