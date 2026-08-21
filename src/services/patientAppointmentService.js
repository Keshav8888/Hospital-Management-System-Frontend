import api from "./api";

export const getMyPatientAppointments = async () => {
    const response = await api.get(
        "/api/patient/appointments"
    );

    return response.data;
};


export const bookPatientAppointment = async (
    appointmentData
) => {
    const response = await api.post(
        "/api/patient/appointments",
        appointmentData
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


export const cancelMyPatientAppointment = async (
    id
) => {
    const response = await api.put(
        `/api/patient/appointments/${id}/cancel`
    );

    return response.data;
};


export const getPatientDoctors = async (
    departmentId = null
) => {

    const response = await api.get(
        "/api/patient/doctors",
        {
            params: departmentId
                ? { departmentId }
                : {}
        }
    );

    return response.data;
};


export const getPatientDepartments = async () => {

    const response = await api.get(
        "/api/patient/departments/active"
    );

    return response.data;
};