import axios from "axios";

const loginUser = async (credentials) => {
  const response = await axios.get(
    "http://localhost:3000/users?email=" + credentials.email,
  );
  const users = response.data;
  if (users.length === 0 || users[0].password !== credentials.password) {
    throw new Error("Invalid Credentials");
  }
  return users[0];
};

export default loginUser;
