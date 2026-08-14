import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import StatCard from "../../components/admin/StatCard";

import { getAdminDashboard } from "../../services/adminDashboardService";

import "../../styles/adminDashboard.css";


function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            console.log("Loading admin dashboard...");

            const response = await getAdminDashboard();

            console.log("Dashboard response:", response);

            console.log("Dashboard data:", response.data);

            setDashboard(response.data);

        } catch (error) {

            console.error(
                "Failed to load dashboard:",
                error
            );

            setError(
                "Unable to load dashboard data."
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (
            <div>
                Loading...
            </div>
        );

    }


    if (error) {

        return (
            <div>
                <h2>{error}</h2>

                <button onClick={loadDashboard}>
                    Try Again
                </button>
            </div>
        );

    }


    if (!dashboard) {

        return (
            <div>
                No dashboard data found.
            </div>
        );

    }


    return (

        <div className="admin-layout">

            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />


            <main className="admin-main">

                <AdminNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />


                <div className="admin-content">

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p className="dashboard-subtitle">
                        Overview of hospital activities
                    </p>


                    <div className="stats-grid">

                        <StatCard
                            title="Total Doctors"
                            value={dashboard.totalDoctors}
                        />

                        <StatCard
                            title="Total Patients"
                            value={dashboard.totalPatients}
                        />

                        <StatCard
                            title="Total Receptionists"
                            value={dashboard.totalReceptionists}
                        />

                        <StatCard
                            title="Total Departments"
                            value={dashboard.totalDepartments}
                        />

                        <StatCard
                            title="Total Appointments"
                            value={dashboard.totalAppointments}
                        />

                        <StatCard
                            title="Today's Appointments"
                            value={dashboard.todaysAppointments}
                        />

                        <StatCard
                            title="Completed Appointments"
                            value={dashboard.completedAppointments}
                        />

                        <StatCard
                            title="Cancelled Appointments"
                            value={dashboard.cancelledAppointments}
                        />

                    </div>

                </div>

            </main>

        </div>

    );

}


export default AdminDashboard;