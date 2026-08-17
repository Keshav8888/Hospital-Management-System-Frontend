import api from "./api";

export const getPatients = async (
    keyword = "",
    page = 0,
    size = 10,
    sortBy = "firstName",
    sortDir = "asc"
) => {

    const response = await api.get("/api/admin/patients", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            sortDir
        }
    });

    return response.data;
};


export const getPatientById = async (id) => {

    const response = await api.get(
        `/api/admin/patients/${id}`
    );

    return response.data;
};


export const updatePatient = async (id, patientData) => {

    const response = await api.put(
        `/api/admin/patients/${id}`,
        patientData
    );

    return response.data;
};


export const deactivatePatient = async (id) => {

    const response = await api.delete(
        `/api/admin/patients/${id}`
    );

    return response.data;
};