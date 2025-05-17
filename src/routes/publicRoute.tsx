// src/routes/PublicRoute.tsx
import React, { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PublicRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
