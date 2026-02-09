import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authentication/context/authContext.jsx";

const ProtectedRoute = ({ requireAuth = true }) => {
  const { user } = useAuth();

  if (requireAuth) {
    return user ? <Outlet /> : <Navigate to="/" replace />;
  } else {
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
  }
};

export default ProtectedRoute;
