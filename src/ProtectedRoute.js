// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin }) => {
//   const isAuthenticated = !!localStorage.getItem("uid");
//   const isAdminUser = localStorage.getItem("isAdmin") === "true";

//   if (!isAuthenticated) {
//     // If not authenticated, redirect to login page
//     return <Navigate to={isAdmin ? "/admin-login" : "/login"} />;
//   }
//   if (!isAuthenticated) {
//     // If not authenticated, redirect to login page
//     return <Navigate to={isAdmin ? "/admin-login" : "/login"} />;
//   }

//   if (isAdmin && !isAdminUser) {
//     // If accessing admin route without admin rights
//     return <Navigate to="/admin-login/dashboard" />;
//   }

//   // If authenticated, render the protected route
//   return <Outlet />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, redirectTo }) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

