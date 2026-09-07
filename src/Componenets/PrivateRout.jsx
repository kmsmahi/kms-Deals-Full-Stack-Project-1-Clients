import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
        <p className="text-sm font-medium text-purple-700/70 animate-pulse">
          Authenticating...
        </p>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={{ from: location.pathname }} to="/auth/login" replace />;
};

export default PrivateRoute;