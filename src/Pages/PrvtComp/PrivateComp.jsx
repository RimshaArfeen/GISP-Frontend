import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateComp = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("Applicants"));
  const location = useLocation();

  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  const path = location.pathname.toLowerCase();

  if (path.includes("admin") && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (path.includes("student") && user.role !== "student") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateComp;