// ProtectedRoute.tsx
import useOTPStore from '@/stores/use-auth.store';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { credentials, initializeStore } = useOTPStore();
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  if (!credentials.accessCode || !credentials.expiresAt || credentials.expiresAt < Date.now()) {
    // user is not authenticated
    return <Navigate to="/signup" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
