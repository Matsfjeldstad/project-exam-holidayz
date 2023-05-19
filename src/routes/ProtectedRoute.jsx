import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
