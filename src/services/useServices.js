import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/user";

const registerUserServices = (data) => axios.post(`${BASE_URL}/register`, data);
const loginUserServices = (data) => axios.post(`${BASE_URL}/login`, data);
const getMeUserServices = (jwtToken) =>
  axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

export { registerUserServices, loginUserServices, getMeUserServices };
