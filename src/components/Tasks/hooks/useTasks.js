import { useState, useCallback } from "react";
import * as TaskServices from "../../../services/TaskServices.js";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState({
    "to-do": false,
    "in-progress": false,
    "done": false,
  });
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading({ "to-do": true, "in-progress": true, "done": true });
    try {
      const response = await TaskServices.fetchTasks();
      setTasks(response);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading({ "to-do": false, "in-progress": false, "done": false });
    }
  },[]);

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await TaskServices.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  },[]);

  const updateTask = useCallback(async (taskData) => {
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
  },[tasks]);

  const deleteTask = useCallback(async (id) => {
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
  },[tasks]);

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
