import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  if (response.status !== 201) throw Error("Failed to create task");
  return response.data;
};
export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  if (response.status !== 200) throw Error("Failed to fetch tasks");
  return response.data;
};

export const updateTask = async ({
  id,
  title,
  priority,
  status,
  dueDate,
  assignee,
}) => {
  const response = await axios.patch(`${API_URL}/${id}`, {
    title: title,
    status: status,
    priority: priority,
    dueDate: dueDate,
    assignee: assignee,
  });
  if (response.status !== 200) throw Error("Failed to update task");

  return response.data;
};

export const deleteTask = async ({ id }) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  if (response.status !== 200) throw Error("Failed to Delete task");
  return response.status;
};
