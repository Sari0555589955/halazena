import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const Public = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default Public;
