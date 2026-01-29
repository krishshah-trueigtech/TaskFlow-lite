import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../Tasks/taskSlice";
import { logout } from "../auth/authSlice.js";
import TaskBoard from "../Tasks/TaskBoard.jsx";
import TaskForm from "../Tasks/TaskForm.jsx";
import { useTaskFilter } from "../../hooks/useTaskFilter.js";
import { useDebounce } from "../../hooks/useDebounce.js";
import Modal from "../../components/Modal.jsx";
import { useNavigate } from "react-router-dom";
import { useGetTasksQuery } from "../api/apiSlice";

const DashboardContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isModalOpen, editingTask } = useSelector((state) => state.tasks);
  const {
    data: tasks = [],
    isLoading: loading,
    isError: error,
  } = useGetTasksQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const debouncedSearch = useDebounce(searchTerm, 300);
  const filteredTasks = useTaskFilter(tasks, debouncedSearch, priorityFilter);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleOpenCreate = () => dispatch(openModal(null));
  const handleCloseModal = () => dispatch(closeModal());

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
          onClick={handleLogout}
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

        <button onClick={handleOpenCreate}>+ New Task</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm />
      </Modal>

      <TaskBoard tasks={filteredTasks} loading={loading} error={error} />
    </div>
  );
};

export const Dashboard = () => {
  return <DashboardContent />;
};
