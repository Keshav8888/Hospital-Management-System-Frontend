// import axios from "axios";

// const API_URL = "http://localhost:8080/api/admin/dashboard";

// export const getAdminDashboard = async () => {

//     const token = localStorage.getItem("token");

//     const response = await axios.get(API_URL, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });

//     return response.data;
// };

import api from "./api";


export const getAdminDashboard = () => {

    return api.get("/api/admin/dashboard");

};