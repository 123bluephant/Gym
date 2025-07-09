import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/UserAtom';
import LoadingSpinner from './Ui/LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireLoggedIn?: boolean;
  requireLoggedOut?: boolean;
  role?: 'user' | 'gym_owner' | 'admin';
  loadingComponent?: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  requireLoggedIn = false,
  requireLoggedOut = false,
  role,
  loadingComponent = <LoadingSpinner fullScreen />,
}) => {
  const user = useRecoilValue(userAtom);
  const location = useLocation();

  // Still loading user data
  if (user === undefined) {
    return <>{loadingComponent}</>;
  }

  // Check if user needs to be logged in
  if (requireLoggedIn && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user needs to be logged out
  if (requireLoggedOut && user) {
    return <Navigate to="/" replace />;
  }

  // Check role requirements
  if (requireLoggedIn && role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render children
  return <>{children}</>;
};

export default AuthWrapper;