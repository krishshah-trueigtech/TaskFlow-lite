import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_USERS;

const loginUser = async (credentials) => {
  const response = await axios.get(`${API_URL}?email=` + credentials.email);
  const users = response.data;
  if (users.length === 0 || users[0].password !== credentials.password) {
    throw new Error("Invalid Credentials");
  }
  return users[0];
};

export default loginUser;
