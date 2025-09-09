import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const loginToken = localStorage.getItem("loginToken"); // token sementara dari login
  const authToken = localStorage.getItem("authToken");   // token final setelah pilih cabang
  const location = useLocation();

  // 📌 Belum login → hanya boleh ke halaman login
  if (!loginToken && !authToken) {
    if (location.pathname !== "/") {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  // 📌 Sudah login tapi belum pilih cabang → wajib ke get_branches
  if (loginToken && !authToken) {
    if (location.pathname !== "/get_branches") {
      return <Navigate to="/get_branches" replace />;
    }
    return <>{children}</>;
  }

  // 📌 Sudah pilih cabang → wajib ke dashboard
  if (authToken) {
    if (location.pathname === "/" || location.pathname === "/get_branches") {
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
