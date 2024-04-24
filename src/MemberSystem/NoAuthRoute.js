import React, { useEffect, useNavigate } from "react";
import { Navigate } from "react-router-dom";

const NoAuthRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userToken");


  if (isLoggedIn) {
    return <Navigate to="/alist" replace />;
  }

  return children;
};

export default NoAuthRoute;
