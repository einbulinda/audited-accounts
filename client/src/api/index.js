import axios from "axios";
axios.defaults.withCredentials = true;

const backendUrl = "http://localhost:8000/api";

export const onRegistration = async (regData) => {
  return await axios.post(`${backendUrl}/register`, regData);
};
