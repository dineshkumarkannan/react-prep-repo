import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return loggedIn === true ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
