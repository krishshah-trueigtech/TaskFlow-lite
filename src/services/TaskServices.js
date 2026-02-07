import axiosApi from "./api";

export const createTask = (taskData) => axiosApi.post("/tasks", taskData);

export const fetchTasks = () => axiosApi.get("/tasks");

export const updateTask = ({ id, ...data }) =>
  axiosApi.patch(`/tasks/${id}`, data);

export const deleteTask = ({ id }) => axiosApi.delete(`/tasks/${id}`);
