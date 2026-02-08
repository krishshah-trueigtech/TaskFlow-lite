import { useTaskContext } from "../context/TaskContext";

const useTaskCard = (props) => {
  const { updateTask, deleteTask, openEditModal } = useTaskContext();

  const getPriorityColor = (p) => {
    if (p === "High") return "red";
    if (p === "Medium") return "orange";
    return "green";
  };

  const handleStatusChange = async (newStatus) => {
    await updateTask({ ...props, status: newStatus });
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(props.id);
    }
  };
  return { getPriorityColor, handleStatusChange, handleDelete, openEditModal };
};
export default useTaskCard;
