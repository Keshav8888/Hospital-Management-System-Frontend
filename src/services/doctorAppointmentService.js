import api from "./api";

export const getDoctorAppointments = async () => {
    const response = await api.get(
        "/api/doctor/appointments"
    );

    return response.data;
};

export const getDoctorTodaysAppointments = async () => {
    const response = await api.get(
        "/api/doctor/appointments/today"
    );

    return response.data;
};

export const getDoctorAppointmentHistory = async () => {
    const response = await api.get(
        "/api/doctor/appointments/history"
    );

    return response.data;
};

export const getDoctorAppointmentById = async (id) => {
    const response = await api.get(
        `/api/doctor/appointments/${id}`
    );

    return response.data;
};

export const confirmDoctorAppointment = async (id) => {
    const response = await api.put(
        `/api/doctor/appointments/${id}/confirm`
    );

    return response.data;
};

export const completeDoctorAppointment = async (id) => {
    const response = await api.put(
        `/api/doctor/appointments/${id}/complete`
    );

    return response.data;
};

export const addConsultationRemarks = async (
    id,
    remarks
) => {
    const response = await api.put(
        `/api/doctor/appointments/${id}/remarks`,
        {
            remarks
        }
    );

    return response.data;
};