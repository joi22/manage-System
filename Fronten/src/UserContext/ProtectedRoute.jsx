import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContextProvider";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRole &&
    (Array.isArray(requiredRole)
      ? !requiredRole.includes(user.Role)
      : user.Role !== requiredRole)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
