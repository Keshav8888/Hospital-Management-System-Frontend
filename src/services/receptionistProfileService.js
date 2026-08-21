import api from "./api";

export const getMyReceptionistProfile = async () => {

    const response = await api.get(
        "/api/receptionist/profile"
    );

    return response.data;
};


export const updateMyReceptionistProfile = async (
    profileData
) => {

    const response = await api.put(
        "/api/receptionist/profile",
        profileData
    );

    return response.data;
};