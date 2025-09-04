import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsValid(false);
      return;
    }

    fetch(`${BaseUrl}/api/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsValid(true);
        } else {
          localStorage.removeItem("authToken");
          setIsValid(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        setIsValid(false);
      });
  }, []);

  if (isValid === null) {
    return <div className="text-center mt-10">🔄 Checking session...</div>;
  }

  return isValid ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
