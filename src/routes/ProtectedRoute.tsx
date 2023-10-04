import { Navigate, Outlet } from 'react-router-dom';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
import { routes } from '../static/routes';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    //TODO:
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to={routes.login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
