import api from "./api";

export const getDoctorDashboard = async () => {

    const response = await api.get(
        "/api/doctor/dashboard"
    );

    return response.data;
};