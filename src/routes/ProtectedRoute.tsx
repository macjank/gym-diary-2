import { LinearProgress } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import useIsAuthenticated from '../hooks/api/auth/useIsAuthenticated';
import { routes } from './routes';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
