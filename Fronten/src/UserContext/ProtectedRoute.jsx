// components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContextProvider";

function ProtectedRoute({ children, requiredRole }) {
  const  user  = useContext(UserContext);
console.log(user,",<<<<<<<<<<<<<<<<")
  // Not logged in
  if (!user) {
    return <Navigate to="login" replace />;
  }

  // Role-based access (optional)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
