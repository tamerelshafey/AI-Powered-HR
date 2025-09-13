
import React from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ADMIN_ROLES } from '../permissions';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useUser();
  
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!currentUser) {
    // User is not logged in, redirect to login page.
    return <ReactRouterDOM.Navigate to="/login" replace />;
  }

  if (!ADMIN_ROLES.includes(currentUser.role)) {
    return <ReactRouterDOM.Navigate to="/portal" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
