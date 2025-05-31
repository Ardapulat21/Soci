// src/routes/PublicRoute.tsx
import React, { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PublicRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null;
  return currentUser ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
