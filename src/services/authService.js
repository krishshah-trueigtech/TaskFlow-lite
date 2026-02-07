import axiosApi from "./api";

export const loginUser = async (credentials) => {
  const users = await axiosApi.get(`/users?email=${credentials?.email}`);
  if (users?.length === 0 || users[0].password !== credentials.password) {
    throw new Error("Invalid Credentials");
  }
  return users[0];
};

export const registerUser = (data) => axiosApi.post("/users", data);

export const updateUserDetails = (userId, data) =>
  axiosApi.patch(`/users/${userId}`, data);
