"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router, isMounted]);

  if (!isAuthenticated || !isMounted) {
    return null;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
