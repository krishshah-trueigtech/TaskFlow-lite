import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Dashboard } from "../components/Dashboard/DashBoard.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<div>Welcome to TaskFlow-Lite. Please Login.</div>}
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
