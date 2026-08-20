import api from "./api";


// ==========================================
// ADMIN
// ==========================================

export const getAdminAppointments = async (
    keyword = "",
    page = 0,
    size = 10,
    sortBy = "appointmentDate",
    sortDir = "asc"
) => {

    const response = await api.get(
        "/api/admin/appointments",
        {
            params: {
                keyword,
                page,
                size,
                sortBy,
                sortDir
            }
        }
    );

    return response.data;
};


export const getAdminTodaysAppointments = async () => {

    const response = await api.get(
        "/api/admin/appointments/today"
    );

    return response.data;
};


export const getAdminAppointmentById = async (id) => {

    const response = await api.get(
        `/api/admin/appointments/${id}`
    );

    return response.data;
};


export const cancelAdminAppointment = async (id) => {

    const response = await api.put(
        `/api/admin/appointments/${id}/cancel`
    );

    return response.data;
};


export const rescheduleAdminAppointment = async (
    id,
    data
) => {

    const response = await api.put(
        `/api/admin/appointments/${id}/reschedule`,
        data
    );

    return response.data;
};


// ==========================================
// PATIENT
// ==========================================

export const bookPatientAppointment = async (data) => {

    const response = await api.post(
        "/api/patient/appointments",
        data
    );

    return response.data;
};


export const getMyPatientAppointments = async () => {

    const response = await api.get(
        "/api/patient/appointments"
    );

    return response.data;
};


export const getMyPatientAppointmentById = async (
    id
) => {

    const response = await api.get(
        `/api/patient/appointments/${id}`
    );

    return response.data;
};


export const cancelPatientAppointment = async (
    id
) => {

    const response = await api.put(
        `/api/patient/appointments/${id}/cancel`
    );

    return response.data;
};


// ==========================================
// DOCTOR
// ==========================================

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


export const getDoctorAppointmentById = async (
    id
) => {

    const response = await api.get(
        `/api/doctor/appointments/${id}`
    );

    return response.data;
};


export const confirmDoctorAppointment = async (
    id
) => {

    const response = await api.put(
        `/api/doctor/appointments/${id}/confirm`
    );

    return response.data;
};


export const completeDoctorAppointment = async (
    id
) => {

    const response = await api.put(
        `/api/doctor/appointments/${id}/complete`
    );

    return response.data;
};


export const addConsultationRemarks = async (
    id,
    data
) => {

    const response = await api.put(
        `/api/doctor/appointments/${id}/remarks`,
        data
    );

    return response.data;
};


// ==========================================
// RECEPTIONIST
// ==========================================

export const getReceptionistAppointments = async (
    keyword = "",
    page = 0,
    size = 10,
    sortBy = "appointmentDate",
    sortDir = "asc"
) => {

    const response = await api.get(
        "/api/receptionist/appointments",
        {
            params: {
                keyword,
                page,
                size,
                sortBy,
                sortDir
            }
        }
    );

    return response.data;
};


export const getReceptionistTodaysAppointments =
    async () => {

        const response = await api.get(
            "/api/receptionist/appointments/today"
        );

        return response.data;
    };


export const bookReceptionistAppointment =
    async (data) => {

        const response = await api.post(
            "/api/receptionist/appointments",
            data
        );

        return response.data;
    };


export const cancelReceptionistAppointment =
    async (id) => {

        const response = await api.put(
            `/api/receptionist/appointments/${id}/cancel`
        );

        return response.data;
    };


export const rescheduleReceptionistAppointment =
    async (id, data) => {

        const response = await api.put(
            `/api/receptionist/appointments/${id}/reschedule`,
            data
        );

        return response.data;
    };