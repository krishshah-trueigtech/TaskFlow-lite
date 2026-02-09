import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Dashboard } from "../components/Dashboard/DashBoard.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute requireAuth={false} />}>
        <Route
          path="/"
          element={
            <div className="p-4 text-center mt-10">
              <h1 className="text-2xl font-bold">Welcome to TaskFlow-Lite</h1>
              <p>Please open the menu to Login or Sign Up.</p>
            </div>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
