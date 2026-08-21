import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientSidebar
    from "../../components/patient/PatientSidebar";

import PatientNavbar
    from "../../components/patient/PatientNavbar";

import {
    getMyPatientProfile
} from "../../services/patientProfileService";

import "../../styles/patientProfile.css";

function PatientProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sidebarOpen, setSidebarOpen] =
        useState(false);


    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data =
                    await getMyPatientProfile();

                setProfile(data);

            } catch (error) {

                console.error(
                    "Failed to load patient profile:",
                    error
                );

                setError(
                    "Unable to load profile."
                );

            } finally {

                setLoading(false);
            }
        };

        loadProfile();

    }, []);


    if (loading) {

        return (
            <div className="patient-profile-message">
                Loading profile...
            </div>
        );
    }


    if (error) {

        return (
            <div className="patient-profile-message">
                {error}
            </div>
        );
    }


    if (!profile) {

        return (
            <div className="patient-profile-message">
                Profile not found.
            </div>
        );
    }


    return (

        <div className="patient-profile-page">

            <PatientSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />


            <main className="patient-profile-main">

                <PatientNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="patient-profile-content">

                    <div className="patient-profile-header">

                        <div>

                            <h1>
                                My Profile
                            </h1>

                            <p>
                                View your personal information
                            </p>

                        </div>


                        <button
                            className="patient-profile-edit-button"
                            onClick={() =>
                                navigate(
                                    "/patient/profile/edit"
                                )
                            }
                        >
                            Edit Profile
                        </button>

                    </div>


                    <div className="patient-profile-card">

                        <div className="patient-profile-row">
                            <span>Patient ID</span>
                            <strong>
                                {profile.id}
                            </strong>
                        </div>

                        {/* <div className="patient-profile-row">
                            <span>Name</span>
                            <strong>
                                {profile.firstName}{" "}
                                {profile.lastName}
                            </strong>
                        </div> */}

                        <div className="patient-profile-row">
                            <span>Email</span>
                            <strong>
                                {profile.email}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Gender</span>
                            <strong>
                                {profile.gender}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Date of Birth</span>
                            <strong>
                                {profile.dateOfBirth}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Phone</span>
                            <strong>
                                {profile.phone}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Blood Group</span>
                            <strong>
                                {profile.bloodGroup}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Emergency Contact</span>
                            <strong>
                                {profile.emergencyContact ||
                                    "Not provided"}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Address</span>
                            <strong>
                                {profile.address}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Allergies</span>
                            <strong>
                                {profile.allergies ||
                                    "None"}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Medical History</span>
                            <strong>
                                {profile.medicalHistory ||
                                    "None"}
                            </strong>
                        </div>

                        <div className="patient-profile-row">
                            <span>Status</span>

                            <span
                                className={
                                    profile.status === "ACTIVE"
                                        ? "patient-profile-status patient-profile-status-active"
                                        : "patient-profile-status patient-profile-status-inactive"
                                }
                            >
                                {profile.status}
                            </span>
                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default PatientProfile;