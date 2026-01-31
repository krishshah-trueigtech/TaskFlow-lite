import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "../components/Authentication/components/LoginForm/component/LoginForm";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Dashboard } from "../components/Dashboard/DashBoard.jsx";

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
