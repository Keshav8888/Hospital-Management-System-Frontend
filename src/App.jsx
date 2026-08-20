import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import AdminDoctors from "./pages/admin/AdminDoctors";
import DoctorDetails from "./pages/admin/DoctorDetails";
import AddDoctor from "./pages/admin/AddDoctor";
import EditDoctor from "./pages/admin/EditDoctor";
import AdminPatients from "./pages/admin/AdminPatients";
import PatientDetails from "./pages/admin/PatientDetails";
import EditPatient from "./pages/admin/EditPatient";
import AdminReceptionists from "./pages/admin/AdminReceptionists";
import AddReceptionist from "./pages/admin/AddReceptionist";
import ReceptionistDetails from "./pages/admin/ReceptionistDetails";
import EditReceptionist from "./pages/admin/EditReceptionist";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AddDepartment from "./pages/admin/AddDepartment";
import DepartmentDetails from "./pages/admin/DepartmentDetails";
import EditDepartment from "./pages/admin/EditDepartment";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminAppointmentDetails from "./pages/admin/AdminAppointmentDetails";
import AdminRescheduleAppointment from "./pages/admin/AdminRescheduleAppointment";
import ReceptionistAppointments from "./pages/receptionist/ReceptionistAppointments";
import ReceptionistPatients from "./pages/receptionist/ReceptionistPatients";
import RegisterPatient from "./pages/receptionist/RegisterPatient";
import ReceptionistPatientDetails from "./pages/receptionist/ReceptionistPatientDetails";
import EditReceptionistPatient from "./pages/receptionist/EditReceptionistPatient";


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
                path="/admin/receptionists"
                element={<AdminReceptionists />}
            />

            <Route
                path="/admin/receptionists/add"
                element={<AddReceptionist />}
            />

            <Route
                path="/admin/receptionists/:id/edit"
                element={<EditReceptionist />}
            />

            <Route
                path="/admin/receptionists/:id"
                element={<ReceptionistDetails />}
            />

            <Route
                path="/admin/departments"
                element={<AdminDepartments />}
            />

            <Route
                path="/admin/departments/add"
                element={<AddDepartment />}
            />

            <Route
                path="/admin/departments/:id/edit"
                element={<EditDepartment />}
            />

            <Route
                path="/admin/departments/:id"
                element={<DepartmentDetails />}
            />

            <Route
                path="/admin/appointments"
                element={<AdminAppointments />}
            />

            <Route
                path="/admin/appointments/:id/reschedule"
                element={<AdminRescheduleAppointment />}
            />

            <Route
                path="/admin/appointments/:id"
                element={<AdminAppointmentDetails />}
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

            <Route
                path="/receptionist/appointments"
                element={<ReceptionistAppointments />}
            />

            <Route
                path="/receptionist/patients"
                element={<ReceptionistPatients />}
            />

            <Route
                path="/receptionist/patients/add"
                element={<RegisterPatient />}
            />

            <Route
                path="/receptionist/patients/:id/edit"
                element={<EditReceptionistPatient />}
            />

            <Route
                path="/receptionist/patients/:id"
                element={<ReceptionistPatientDetails />}
            />

        </Routes>
    );
}

export default App;