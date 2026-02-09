import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useTasks } from "../hooks/useTasks";
import { useModal } from "../../../common/Modal/context/ModalContext";
import { toast } from "react-toastify";
import * as TaskServices from "../../../services/TaskServices.js";
import { retryLastRequest } from "../../../services/api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskData = useTasks();
  const {
    tasks,
    setTasks,
    error,
    setError,
    fetchTasks,
    updateTask: baseUpdate,
    deleteTask: baseDelete,
    createTask: baseCreate,
  } = taskData;
  const { openModal, closeModal: closeGlobalModal } = useModal();
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleRetry = useCallback(async () => {
    setError(null);
    try {
      await retryLastRequest();
      toast.success("Retry successful!");
      await fetchTasks();
    } catch (err) {
      setError(`Retry failed: ${err.message || "Unknown error"}`);
      toast.error("Retry attempt failed.");
    }
  }, [fetchTasks, setError]);

  const createTask = useCallback(
    async (data) => {
      const result = await baseCreate(data);
      if (result) {
        toast.success("Task created successfully!");
      }
      return result;
    },
    [baseCreate]
  );

  const updateTask = useCallback(
    async (data) => {
      const success = await baseUpdate(data);
      if (success) {
        toast.info("Task updated successfully!");
      } else {
        toast.error("Update failed. You can retry from the dashboard.");
      }
    },
    [baseUpdate]
  );

  const openCreateModal = useCallback(() => {
    setEditingTask(null);
    openModal("taskForm");
  }, [openModal]);

  const openEditModal = useCallback(
    (task) => {
      setEditingTask(task);
      openModal("taskForm", { editingTask: task });
    },
    [openModal]
  );

  const closeModal = useCallback(() => {
    setEditingTask(null);
    closeGlobalModal();
  }, [closeGlobalModal]);

  const onDragEnd = useCallback(
    async (result) => {
      const { destination, source, draggableId } = result;
      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return;
      }
      const isSelected = selectedTaskIds.includes(draggableId);
      const idsToMove = isSelected ? selectedTaskIds : [draggableId];

      setTasks((prev) =>
        prev.map((task) =>
          idsToMove.includes(task.id)
            ? { ...task, status: destination.droppableId }
            : task
        )
      );
      try {
        await Promise.all(
          idsToMove.map((id) =>
            updateTask({ id, status: destination.droppableId })
          )
        );
        setSelectedTaskIds([]);
      } catch {
        toast.error("Failed to move multiple tasks");
        fetchTasks(); 
      }
    },
    [selectedTaskIds, updateTask, setTasks, fetchTasks]
  );

  const toggleTaskSelection = useCallback((taskId) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  }, []);

  const bulkStatusUpdate = useCallback(
    async (newStatus) => {
      if (selectedTaskIds.length === 0) return;

      await Promise.all(
        selectedTaskIds.map((id) => updateTask({ id, status: newStatus }))
      );
      setSelectedTaskIds([]);
    },
    [selectedTaskIds, updateTask]
  );

  const deleteTask = useCallback(
    async (id) => {
      const taskBackup = tasks.find((t) => t.id === id);
      if (!taskBackup) return;

      const success = await baseDelete(id);

      if (success) {
        toast(
          <div className="flex justify-between items-center">
            <span>Task deleted</span>
            <button
              className="ml-4 bg-white text-purple-900 px-2 py-1 rounded text-xs font-bold"
              onClick={() => {
                baseCreate(taskBackup);
                toast.dismiss();
              }}
            >
              UNDO
            </button>
          </div>,
          { autoClose: 5000, closeOnClick: false }
        );
      }
    },
    [tasks, baseDelete, baseCreate]
  );

  const bulkDelete = useCallback(async () => {
    if (selectedTaskIds.length === 0) return;

    const tasksToRestore = tasks.filter((task) =>
      selectedTaskIds.includes(task.id)
    );
    const idsToDelete = [...selectedTaskIds];

    setTasks((prev) => prev.filter((task) => !idsToDelete.includes(task.id)));
    setSelectedTaskIds([]);

    try {
      await Promise.all(
        idsToDelete.map((id) => TaskServices.deleteTask({ id }))
      );

      toast(
        <div className="flex justify-between items-center">
          <span>{idsToDelete.length} tasks deleted</span>
          <button
            className="ml-4 bg-white text-primaryColor px-2 py-1 rounded text-xs font-bold"
            onClick={() => {
              tasksToRestore.forEach((t) => baseCreate(t));
              toast.dismiss();
            }}
          >
            UNDO
          </button>
        </div>,
        { autoClose: 5000, closeOnClick: false }
      );

    } catch {
      setTasks((prev) => [...prev, ...tasksToRestore]);
      
      setError("Bulk delete failed on server");
      toast.error("Bulk delete failed");
    }
  }, [selectedTaskIds, tasks, setTasks, setError, baseCreate]);

  const bulkPriorityUpdate = useCallback(
    async (newPriority) => {
      if (selectedTaskIds.length === 0) return;
      await Promise.all(
        selectedTaskIds.map((id) => updateTask({ id, priority: newPriority }))
      );
      setSelectedTaskIds([]);
    },
    [selectedTaskIds, updateTask]
  );

  const contextValue = useMemo(
    () => ({
      ...taskData,
      editingTask,
      openCreateModal,
      openEditModal,
      closeModal,
      onDragEnd,
      toggleTaskSelection,
      selectedTaskIds,
      bulkStatusUpdate,
      bulkDelete,
      deleteTask,
      bulkPriorityUpdate,
      createTask,
      error,
      handleRetry,
    }),
    [
      createTask,
      taskData,
      deleteTask,
      editingTask,
      openCreateModal,
      openEditModal,
      closeModal,
      onDragEnd,
      selectedTaskIds,
      toggleTaskSelection,
      bulkStatusUpdate,
      bulkDelete,
      bulkPriorityUpdate,
      error,
      handleRetry,
    ]
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);