import api from "./api";

export const getDepartments = async (
    keyword = "",
    page = 0,
    size = 10,
    sortBy = "name",
    sortDir = "asc"
) => {

    const response = await api.get(
        "/api/admin/departments",
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


export const getActiveDepartments = async () => {

    const response = await api.get(
        "/api/admin/departments/active"
    );

    return response.data;
};

export const getReceptionistActiveDepartments = async () => {

    const response = await api.get(
        "/api/receptionist/departments/active"
    );

    return response.data;
};


export const getDepartmentById = async (id) => {

    const response = await api.get(
        `/api/admin/departments/${id}`
    );

    return response.data;
};


export const createDepartment = async (departmentData) => {

    const response = await api.post(
        "/api/admin/departments",
        departmentData
    );

    return response.data;
};


export const updateDepartment = async (
    id,
    departmentData
) => {

    const response = await api.put(
        `/api/admin/departments/${id}`,
        departmentData
    );

    return response.data;
};


export const deactivateDepartment = async (id) => {

    const response = await api.delete(
        `/api/admin/departments/${id}`
    );

    return response.data;
};