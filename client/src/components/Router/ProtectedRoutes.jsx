import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({ condition }) =>
  condition ? <Outlet /> : <Navigate to="/" />;
export default ProtectedRoutes;
