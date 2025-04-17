import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const jwtToken = Cookies.get("jwt_token");

  return jwtToken ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
