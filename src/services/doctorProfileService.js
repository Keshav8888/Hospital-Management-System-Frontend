import api from "./api";

export const getMyDoctorProfile = async () => {

    const response = await api.get(
        "/api/doctor/profile"
    );

    return response.data;
};

export const updateMyDoctorProfile = async (
    profileData
) => {

    const response = await api.put(
        "/api/doctor/profile",
        profileData
    );

    return response.data;
};