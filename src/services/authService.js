import api from "./api";

export const loginUser = async (loginData) => {

    const response = await api.post("/api/auth/login", loginData);

    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);

    return data;
};

export const logoutUser = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
};