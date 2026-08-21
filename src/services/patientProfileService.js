import api from "./api";

export const getMyPatientProfile = async () => {

    const response = await api.get(
        "/api/patient/profile"
    );

    return response.data;
};


export const updateMyPatientProfile = async (
    profileData
) => {

    const response = await api.put(
        "/api/patient/profile",
        profileData
    );

    return response.data;
};