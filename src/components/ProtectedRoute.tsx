import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

interface MyComponentProps {
    children: React.ReactNode;
  }

export const ProtectedRoute: React.FC<MyComponentProps> = ({ children }) => {
    const { user } = useAuthStore()

    if (!user)
        return <Navigate to="/login"/>

    return children
}