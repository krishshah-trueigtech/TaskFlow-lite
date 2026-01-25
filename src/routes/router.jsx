import { TaskProvider, useTaskContext } from "../context/TaskContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../features/auth/LoginForm.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import TaskBoard from "../features/Tasks/TaskBoard.jsx";
import TaskForm from "../features/Tasks/TaskForm.jsx";
import { useTaskFilter } from "../hooks/useTaskFilter.js";
import { useAuth } from "../context/authContext.jsx";
import { useDebounce } from "../hooks/useDebounce.js";

const DashboardContent = () => {
  const { logout, user } = useAuth();
  const { tasks, loading, error, isModalOpen, openCreateModal } =
    useTaskContext();
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

      {isModalOpen && (
        <div style={{ padding: "0 20px", marginBottom: "20px" }}>
          <div
            style={{
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              color: "#333",
            }}
          >
            <TaskForm />
          </div>
        </div>
      )}

      <TaskBoard tasks={filteredTasks} loading={loading} error={error} />
    </div>
  );
};

const Dashboard = () => {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
