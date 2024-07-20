"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state);
  console.log('sat', isAuthenticated)
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router, isClient]);

  if (!isClient || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
