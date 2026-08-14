import api from "./api";

export const getDepartments = async (
    keyword = "",
    page = 0,
    size = 100,
    sortBy = "name",
    sortDir = "asc"
) => {

    const response = await api.get("/api/admin/departments", {
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

export const getActiveDepartments = async () => {

    const response = await api.get(
        "/api/admin/departments/active"
    );

    return response.data;
};