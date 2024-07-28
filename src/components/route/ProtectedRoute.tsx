// ProtectedRoute.tsx
import useOTPStore from '@/stores/use-auth.store';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { credentials, initializeStore } = useOTPStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  if (!credentials.accessCode || !credentials.expiresAt || credentials.expiresAt < Date.now()) {
    // user is not authenticated
    return <Navigate to="/signup" />;
  }

  setTimeout(() => {
    navigate('/signup');
    localStorage.removeItem('otp-store');
  }, credentials.expiresAt - Date.now());

  return <>{children}</>;
};

export default ProtectedRoute;
