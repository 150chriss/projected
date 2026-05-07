import { useEffect, useState } from "react";
import api from "../api/axios";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    api.get("/auth/check")
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p className="p-4">Loading...</p>;

  return auth ? children : <Navigate to="/login" />;
}