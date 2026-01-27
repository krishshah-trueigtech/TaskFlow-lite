import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_TASKS;

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const updateTask = async ({ id, ...data }) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const deleteTask = async ({ id }) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status;
  } catch (error) {
    throw error.message;
  }
};
