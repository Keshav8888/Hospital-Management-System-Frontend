import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
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
import BookAppointment from "./pages/receptionist/BookAppointment";
import ReceptionistAppointmentDetails from "./pages/receptionist/ReceptionistAppointmentDetails";
import ReceptionistRescheduleAppointment from "./pages/receptionist/ReceptionistRescheduleAppointment";
import ReceptionistProfile from "./pages/receptionist/ReceptionistProfile";
import EditReceptionistProfile from "./pages/receptionist/EditReceptionistProfile";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorTodayAppointments from "./pages/doctor/DoctorTodayAppointments";
import DoctorAppointmentHistory from "./pages/doctor/DoctorAppointmentHistory";
import DoctorAppointmentDetails from "./pages/doctor/DoctorAppointmentDetails";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import EditDoctorProfile from "./pages/doctor/EditDoctorProfile";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientProfile from "./pages/patient/PatientProfile";
import BookPatientAppointment from "./pages/patient/BookPatientAppointment";
import PatientAppointmentDetails from "./pages/patient/PatientAppointmentDetails";
import EditPatientProfile from "./pages/patient/EditPatientProfile";


function App() {
  return (
    <Routes>

      <Route path="/" 
        element={<Login />} 
      />

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
          path="/doctor/appointments"
          element={<DoctorAppointments />}
        />

        <Route
          path="/doctor/appointments/today"
          element={<DoctorTodayAppointments />}
        />

        <Route
          path="/doctor/appointments/history"
          element={<DoctorAppointmentHistory />}
        />

        <Route
          path="/doctor/appointments/:id"
          element={<DoctorAppointmentDetails />}
        />

        <Route
          path="/doctor/profile"
          element={<DoctorProfile />}
        />

      <Route
          path="/doctor/profile/edit"
          element={<EditDoctorProfile />}
      />
      <Route
        path="/patient/dashboard"
        element={<PatientDashboard />}
      />

      <Route
        path="/patient/appointments"
        element={<PatientAppointments />}
      />

      <Route
        path="/patient/appointments/book"
        element={<BookPatientAppointment />}
      />

      <Route
        path="/patient/appointments/:id"
        element={<PatientAppointmentDetails />}
      />

      <Route
        path="/patient/profile"
        element={<PatientProfile />}
      />

      <Route
        path="/patient/profile/edit"
        element={<EditPatientProfile />}
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
        path="/receptionist/appointments/:id"
        element={<ReceptionistAppointmentDetails />}
      />

      <Route
        path="/receptionist/appointments/:id/reschedule"
        element={<ReceptionistRescheduleAppointment />}
      />

      <Route
        path="/receptionist/appointments/book"
        element={<BookAppointment />}
      />

      <Route 
        path="/receptionist/profile" 
        element={<ReceptionistProfile />} 
      />

      <Route
        path="/receptionist/profile/edit"
        element={<EditReceptionistProfile />}
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
