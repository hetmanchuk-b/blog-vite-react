import {useAuth} from "../hooks/use-auth.ts";
import {Navigate, Outlet} from "react-router-dom";

interface Props {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({requireAuth = false, requireAdmin = false}: Props) => {
  const {isAuthenticated, isAdmin, isLoading} = useAuth();

  if (isLoading) {
    return <div className="p-4 text-2xl font-semibold">Loading...</div>
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
};