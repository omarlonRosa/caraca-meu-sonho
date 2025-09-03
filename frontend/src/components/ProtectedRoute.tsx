import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from 'react-router-dom';
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

   
  return children;
};
