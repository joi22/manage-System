import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContextProvider";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // ⬅️ you can make this a spinner later
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.Role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
