import { useState, useCallback } from "react";
import * as TaskServices from "../../../services/TaskServices.js";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState({
    "to-do": false,
    "in-progress": false,
    done: false,
  });
  
  const [error, setError] = useState(null);
  const [failedAction, setFailedAction] = useState(null);

  const handleError = (err, actionFn) => {
    setError(err.message || "Something went wrong");
    setFailedAction(() => actionFn);
  };

  const retry = useCallback(() => {
    if (failedAction) {
      setError(null);      
      setFailedAction(null);
      failedAction();       
    }
  }, [failedAction]);

  const fetchTasks = useCallback(async () => {
    setLoading({ "to-do": true, "in-progress": true, done: true });
    setError(null);
    try {
      const response = await TaskServices.fetchTasks();
      setTasks(response);
    } catch (err) {
      handleError(err, fetchTasks);
    } finally {
      setLoading({ "to-do": false, "in-progress": false, done: false });
    }
  }, []); 

  const updateTask = useCallback(async (taskData) => {

    setTasks((prev) =>
      prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
    );

    try {
      await TaskServices.updateTask(taskData);
      return true;
    } catch (err) {
      fetchTasks(); 
      handleError(err, () => updateTask(taskData)); 
      return false;
    }
  }, [fetchTasks]);

  const deleteTask = useCallback(async (id) => {

    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await TaskServices.deleteTask({ id });
      return true;
    } catch (err) {
      fetchTasks(); 
      handleError(err, () => deleteTask(id));
      return false;
    }
  }, [fetchTasks]);

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await TaskServices.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return true;
    } catch (err) {
      handleError(err, () => createTask(taskData));
      return false;
    }
  }, []);

  return {
    tasks,
    setTasks,
    loading,
    error,   
    setError,
    retry,   
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};