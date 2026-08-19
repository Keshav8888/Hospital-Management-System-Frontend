import api from "./api";

export const getReceptionists = async (
    keyword = "",
    page = 0,
    size = 10,
    sortBy = "firstName",
    sortDir = "asc"
) => {

    const response = await api.get(
        "/api/admin/receptionists",
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

export const getReceptionistById = async (id) => {

    const response = await api.get(
        `/api/admin/receptionists/${id}`
    );

    return response.data;
};

export const registerReceptionist = async (data) => {

    const response = await api.post(
        "/api/admin/receptionists",
        data
    );

    return response.data;
};

export const updateReceptionist = async (id, data) => {

    const response = await api.put(
        `/api/admin/receptionists/${id}`,
        data
    );

    return response.data;
};

export const deactivateReceptionist = async (id) => {

    const response = await api.delete(
        `/api/admin/receptionists/${id}`
    );

    return response.data;
};