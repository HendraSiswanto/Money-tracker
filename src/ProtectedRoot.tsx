import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const ProtectedRoot = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoot;
