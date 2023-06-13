import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
export default Private;
