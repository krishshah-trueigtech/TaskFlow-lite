import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
const Dashboard = () => <h2>Dashboard (Private)</h2>;

const appRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default appRoutes;
