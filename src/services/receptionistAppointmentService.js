import api from "./api";

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


export const getReceptionistTodaysAppointments = async () => {

    const response = await api.get(
        "/api/receptionist/appointments/today"
    );

    return response.data;
};


export const bookReceptionistAppointment = async (
    appointmentData
) => {

    const response = await api.post(
        "/api/receptionist/appointments",
        appointmentData
    );

    return response.data;
};


export const cancelReceptionistAppointment = async (
    id
) => {

    const response = await api.put(
        `/api/receptionist/appointments/${id}/cancel`
    );

    return response.data;
};


export const rescheduleReceptionistAppointment = async (
    id,
    appointmentData
) => {

    const response = await api.put(
        `/api/receptionist/appointments/${id}/reschedule`,
        appointmentData
    );

    return response.data;
};