import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authentication/context/authContext.jsx";
const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
