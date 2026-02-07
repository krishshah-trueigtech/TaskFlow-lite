import { createContext, useContext, useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import {useMemo} from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskData = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    taskData.fetchTasks();
  }, []);

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const contextValue = useMemo(() => ({
    ...taskData,
    isModalOpen,
    editingTask,
    openCreateModal,
    openEditModal,
    closeModal,
  }), [taskData, isModalOpen, editingTask]);

  return (
    <TaskContext.Provider
      value={contextValue}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
