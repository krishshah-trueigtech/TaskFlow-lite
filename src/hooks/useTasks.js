import { useState } from "react";
import * as TaskServices from "../services/TaskServices.js";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await TaskServices.fetchTasks();
      setTasks(response);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    setLoading(true);

    try {
      const newTask = await TaskServices.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskData) => {
    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskData.id ? { ...task, ...taskData } : task,
      ),
    );
    try {
      await TaskServices.updateTask(taskData);
      return true;
    } catch (err) {
      setTasks(previousTasks);
      setError(err);
      return false;
    }
  };

  const deleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      await TaskServices.deleteTask({ id });
      return true;
    } catch (err) {
      setTasks(previousTasks);
      setError(err);
      return false;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
