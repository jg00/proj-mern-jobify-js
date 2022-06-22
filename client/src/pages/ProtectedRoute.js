import { useAppContext } from "../context/appContext.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // console.log("@ProtectedRoute fired");
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
