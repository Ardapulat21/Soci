import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type { PropsWithChildren } from "react";

type ProtectedRouteProps = PropsWithChildren;
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
