import { useState } from "react";
import { TaskProvider, useTaskContext } from "../Tasks/context/TaskContext.jsx";
import TaskBoard from "../Tasks/components/TaskBoard/components/TaskBoard.jsx";
import TaskForm from "../Tasks/components/TaskForm/components/TaskForm.jsx";
import { useTaskFilter } from "../Tasks/hooks/useTaskFilter.js";
import { useDebounce } from "../../common/hooks/useDebounce.js";
import Modal from "../../common/Modal/Modal.jsx";

const DashboardContent = () => {
  const {
    tasks,
    loading,
    error,
    isModalOpen,
    closeModal,
    editingTask,
    openCreateModal,
  } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const debouncedSearch = useDebounce(searchTerm, 300);
  const filteredTasks = useTaskFilter(tasks, debouncedSearch, priorityFilter);

  return (
    <div className="dashboard-container">
      <div
        className="controls"
        style={{
          padding: "20px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={openCreateModal}>+ New Task</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm />
      </Modal>

      <TaskBoard tasks={filteredTasks} loading={loading} error={error} />
    </div>
  );
};

export const Dashboard = () => {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
};
