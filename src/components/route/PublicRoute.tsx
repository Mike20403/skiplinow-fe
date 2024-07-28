// PublicRoute.tsx
import useOTPStore from '@/stores/use-auth.store';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { credentials, initializeStore, logout } = useOTPStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  if (credentials.accessCode && credentials.expiresAt && credentials.expiresAt > Date.now()) {
    // user is authenticated
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
