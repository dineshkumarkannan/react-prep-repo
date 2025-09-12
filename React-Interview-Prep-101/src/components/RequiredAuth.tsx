import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth);
  console.log(location);
  if (!auth?.isAuthenticated) {
    console.log("test");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default RequiredAuth;
