import { createContext, useContext, useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";

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

  return (
    <TaskContext.Provider
      value={{
        ...taskData,
        isModalOpen,
        editingTask,
        openCreateModal,
        openEditModal,
        closeModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
