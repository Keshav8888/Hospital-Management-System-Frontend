import api from "./api";

export const getReceptionistPatients = async (
    keyword = "",
    page = 0,
    size = 10,
    sortBy = "firstName",
    sortDir = "asc"
) => {

    const response = await api.get(
        "/api/receptionist/patients",
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


export const registerReceptionistPatient = async (
    patientData
) => {

    const response = await api.post(
        "/api/receptionist/patients",
        patientData
    );

    return response.data;
};


export const getReceptionistPatientById = async (
    id
) => {

    const response = await api.get(
        `/api/receptionist/patients/${id}`
    );

    return response.data;
};


export const updateReceptionistPatient = async (
    id,
    patientData
) => {

    const response = await api.put(
        `/api/receptionist/patients/${id}`,
        patientData
    );

    return response.data;
};


export const deactivateReceptionistPatient = async (
    id
) => {

    const response = await api.delete(
        `/api/receptionist/patients/${id}`
    );

    return response.data;
};