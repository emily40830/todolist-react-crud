import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log('home', isAuthenticated);
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/todos" replace />;
};

export default HomePage;
