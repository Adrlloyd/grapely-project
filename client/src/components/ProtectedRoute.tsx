import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useContext(AuthContext);

  if (!auth?.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;