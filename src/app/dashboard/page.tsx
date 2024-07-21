"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import ProtectedRoute from "@/store/utility/ProtectedRoute";
import React from "react";

export default function page() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
