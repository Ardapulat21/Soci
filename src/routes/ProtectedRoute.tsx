// components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthProvider";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to={"auth"} />;
};

export default PrivateRoute;
