import api from "./api";

export const getDoctors = async (
    keyword = "",
    page = 0,
    size = 10,
    sortBy = "firstName",
    sortDir = "asc"
) => {

    const response = await api.get("/api/admin/doctors", {
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