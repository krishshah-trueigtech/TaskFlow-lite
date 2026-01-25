import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import TaskBoard from "../features/Tasks/TaskBoard.jsx";
import TaskForm from "../features/Tasks/TaskForm.jsx";

const Dashboard = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <h2>My Tasks</h2>
        <button onClick={() => alert("Open Modal Here")}>+ Add Task</button>
      </div>

      <TaskBoard />
      <div
        style={{
          marginTop: "40px",
          borderTop: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <h3>Create New Task</h3>
        <TaskForm />
      </div>
    </div>
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
