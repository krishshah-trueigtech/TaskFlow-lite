import axios from "axios";

export const createTask = async (taskData) => {
  const response = await axios.post("http://localhost:3000/tasks", taskData);
  if (response.status !== 201) throw Error("Failed to create task");
  return response.data;
};
export const fetchTasks = async () => {
  const response = await axios.get("http://localhost:3000/tasks");
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
  const response = await axios.patch(`http://localhost:3000/tasks/${id}`, {
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
  const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
  if (response.status !== 200) throw Error("Failed to Delete task");
  return response.status;
};
