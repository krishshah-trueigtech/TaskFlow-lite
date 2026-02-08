import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";
import { useModal } from "../../../common/Modal/context/ModalContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskData = useTasks();
  const { fetchTasks, updateTask } = taskData;
  const { openModal, closeModal: closeGlobalModal } = useModal();
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openCreateModal = useCallback(() => {
    setEditingTask(null);
    openModal("taskForm");
  }, [openModal]);

  const openEditModal = useCallback((task) => {
    setEditingTask(task);
    openModal("taskForm", { editingTask: task });
  }, [openModal]);

  const closeModal = useCallback(() => {
    setEditingTask(null);
    closeGlobalModal();
  }, [closeGlobalModal]);

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
      editingTask,
      openCreateModal,
      openEditModal,
      closeModal,
      onDragEnd,
    }),
    [
      taskData,
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