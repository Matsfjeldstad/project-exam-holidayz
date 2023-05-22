import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/Auth";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  console.log(auth);

  return auth.user ? children : <Navigate to="/login" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
