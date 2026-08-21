import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyReceptionistProfile
} from "../../services/receptionistProfileService";

import ReceptionistSidebar
    from "../../components/receptionist/ReceptionistSidebar";

import ReceptionistNavbar
    from "../../components/receptionist/ReceptionistNavbar";

import "../../styles/receptionistProfile.css";

function ReceptionistProfile() {

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
                    await getMyReceptionistProfile();

                setProfile(data);

            } catch (error) {

                console.error(
                    "Failed to load receptionist profile:",
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
            <div className="receptionist-profile-message">
                Loading profile...
            </div>
        );
    }


    if (error) {

        return (
            <div className="receptionist-profile-message">
                {error}
            </div>
        );
    }


    if (!profile) {

        return (
            <div className="receptionist-profile-message">
                Profile not found.
            </div>
        );
    }


    return (

        <div className="receptionist-profile-page">

            <ReceptionistSidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />


            <main className="receptionist-profile-main">

                <ReceptionistNavbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />


                <div className="receptionist-profile-content">

                    <div className="receptionist-profile-header">

                        <div>

                            <h1>
                                My Profile
                            </h1>

                            <p>
                                View your receptionist information
                            </p>

                        </div>


                        <button
                            className="profile-edit-button"
                            onClick={() =>
                                navigate(
                                    "/receptionist/profile/edit"
                                )
                            }
                        >
                            Edit Profile
                        </button>

                    </div>


                    <div className="receptionist-profile-card">

                        <div className="profile-detail-row">
                            <span>
                                Receptionist ID
                            </span>

                            <strong>
                                {profile.id}
                            </strong>
                        </div>


                        <div className="profile-detail-row">
                            <span>
                                Name
                            </span>

                            <strong>
                                {profile.firstName}{" "}
                                {profile.lastName}
                            </strong>
                        </div>


                        <div className="profile-detail-row">
                            <span>
                                Email
                            </span>

                            <strong>
                                {profile.email}
                            </strong>
                        </div>


                        <div className="profile-detail-row">
                            <span>
                                Gender
                            </span>

                            <strong>
                                {profile.gender}
                            </strong>
                        </div>


                        <div className="profile-detail-row">
                            <span>
                                Date of Birth
                            </span>

                            <strong>
                                {profile.dateOfBirth}
                            </strong>
                        </div>


                        <div className="profile-detail-row">
                            <span>
                                Phone
                            </span>

                            <strong>
                                {profile.phone}
                            </strong>
                        </div>


                        <div className="profile-detail-row">
                            <span>
                                Address
                            </span>

                            <strong>
                                {profile.address}
                            </strong>
                        </div>


                        <div className="profile-detail-row">
                            <span>
                                Status
                            </span>

                            <span
                                className={
                                    profile.status === "ACTIVE"
                                        ? "profile-status profile-status-active"
                                        : "profile-status profile-status-inactive"
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

export default ReceptionistProfile;