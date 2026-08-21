import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorSidebar
    from "../../components/doctor/DoctorSidebar";

import DoctorNavbar
    from "../../components/doctor/DoctorNavbar";

import {
    getMyDoctorProfile
} from "../../services/doctorProfileService";

import "../../styles/doctorProfile.css";

function DoctorProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data =
                    await getMyDoctorProfile();

                setProfile(data);

            } catch (error) {

                console.error(
                    "Failed to load doctor profile:",
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
            <div className="doctor-profile-message">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="doctor-profile-message">
                {error}
            </div>
        );
    }

    return (
        <div className="doctor-profile-page">

            <DoctorSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="doctor-profile-main">

                <DoctorNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <div className="doctor-profile-content">

                    <div className="doctor-profile-header">

                        <div>

                            <h1>My Profile</h1>

                            <p>
                                View your doctor information
                            </p>

                        </div>

                        <button
                            className="doctor-profile-edit-button"
                            onClick={() =>
                                navigate(
                                    "/doctor/profile/edit"
                                )
                            }
                        >
                            Edit Profile
                        </button>

                    </div>


                    <div className="doctor-profile-card">

                        <div className="doctor-profile-row">
                            <span>Doctor ID</span>
                            <strong>{profile.id}</strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Name</span>
                            <strong>
                                {profile.firstName}{" "}
                                {profile.lastName}
                            </strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Department</span>
                            <strong>{profile.department}</strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Gender</span>
                            <strong>{profile.gender}</strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Date of Birth</span>
                            <strong>
                                {profile.dateOfBirth}
                            </strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Phone</span>
                            <strong>{profile.phone}</strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Qualification</span>
                            <strong>
                                {profile.qualification}
                            </strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Specialization</span>
                            <strong>
                                {profile.specialization}
                            </strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Experience</span>
                            <strong>
                                {profile.experience} years
                            </strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Consultation Fee</span>
                            <strong>
                                ₹{profile.ConsultantionFee}
                            </strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Address</span>
                            <strong>
                                {profile.address}
                            </strong>
                        </div>

                        <div className="doctor-profile-row">
                            <span>Status</span>
                            <span
                                className={
                                    profile.status === "ACTIVE"
                                        ? "doctor-profile-status doctor-profile-status-active"
                                        : "doctor-profile-status doctor-profile-status-inactive"
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

export default DoctorProfile;