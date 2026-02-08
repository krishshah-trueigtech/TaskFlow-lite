import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskData = useTasks();
  const { fetchTasks, updateTask } = taskData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openCreateModal = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(false);
  }, []);

  const onDragEnd = useCallback((result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;
    
    updateTask({ id: draggableId, status: destination.droppableId });
  }, [updateTask]);

  const contextValue = useMemo(
    () => ({
      ...taskData,
      isModalOpen,
      editingTask,
      openCreateModal,
      openEditModal,
      closeModal,
      onDragEnd,
    }),
    [
      taskData,
      isModalOpen,
      editingTask,
      openCreateModal,
      openEditModal,
      closeModal,
      onDragEnd,
    ],
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);