import { useState } from "react";
import { TaskProvider, useTaskContext } from "../../context/TaskContext";
import TaskBoard from "../Tasks/TaskBoard.jsx";
import TaskForm from "../Tasks/TaskForm.jsx";
import { useTaskFilter } from "../../hooks/useTaskFilter.js";
import { useAuth } from "../../context/authContext.jsx";
import { useDebounce } from "../../hooks/useDebounce.js";
import Modal from "../../components/Modal.jsx";

const DashboardContent = () => {
  const { logout, user } = useAuth();
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
      <header
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          borderBottom: "1px solid #ddd",
          color: "#333",
        }}
      >
        <div>
          <h2>TaskFlow Lite</h2>
          <p>Welcome, {user?.email}</p>
        </div>
        <button
          onClick={logout}
          style={{ background: "#ff4d4f", color: "white" }}
        >
          Logout
        </button>
      </header>

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
