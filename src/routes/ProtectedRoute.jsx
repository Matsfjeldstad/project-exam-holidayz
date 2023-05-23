import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/Auth";

export default function ProtectedRoute() {
  const auth = useAuth();
  console.log(auth);

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}
