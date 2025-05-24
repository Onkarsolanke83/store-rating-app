import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

interface RoleRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated, initialized } = useAuth();

  if (!initialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleRoute;