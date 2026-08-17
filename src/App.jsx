import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import ReceptionistDashboard from "./pages/Receptionist/ReceptionistDashboard";
import AdminDoctors from "./pages/admin/AdminDoctors";
import DoctorDetails from "./pages/admin/DoctorDetails";
import AddDoctor from "./pages/admin/AddDoctor";
import EditDoctor from "./pages/admin/EditDoctor";
import AdminPatients from "./pages/admin/AdminPatients";
import PatientDetails from "./pages/admin/PatientDetails";
import EditPatient from "./pages/admin/EditPatient";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
            />

            <Route
                path="/admin/doctors"
                element={<AdminDoctors />}
            />

            <Route
                path="/admin/doctors/:id"
                element={<DoctorDetails />}
            />

            <Route
                path="/admin/doctors/add"
                element={<AddDoctor />}
            />

            <Route
                path="/admin/doctors/:id/edit"
                element={<EditDoctor />}
            />

            <Route
                path="/admin/patients"
                element={<AdminPatients />}
            />

            <Route
                path="/admin/patients/:id"
                element={<PatientDetails />}
            />

            <Route
                path="/admin/patients/:id/edit"
                element={<EditPatient />}
            />

            <Route
                path="/doctor/dashboard"
                element={<DoctorDashboard />}
            />

            <Route
                path="/patient/dashboard"
                element={<PatientDashboard />}
            />

            <Route
                path="/receptionist/dashboard"
                element={<ReceptionistDashboard />}
            />

        </Routes>
    );
}

export default App;