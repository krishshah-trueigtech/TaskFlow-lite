import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "../features/auth/LoginForm.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Dashboard } from "../features/Dashboard/DashBoard.jsx";

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
