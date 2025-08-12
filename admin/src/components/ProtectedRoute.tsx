import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

interface Props {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const userRole = localStorage.getItem("userRole");
  const auth = useContext(AuthContext);

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.warn(" Unauthorized Access - Redirecting to /unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }
  if (!auth?.user) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
