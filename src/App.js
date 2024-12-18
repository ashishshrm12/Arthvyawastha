// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";

// // Components
// import Login from "./components/owner/login/Login";
// import Register from "./components/owner/register/Register";
// import Dashboard from "./components/owner/dashboard/Dashboard";
// import Home from "./components/home/main/Home";
// import UserDashboard from "./components/users/user_dashboard/UserDashboard";
// import Invoices from "./components/users/invoices/Invoices";
// import UserSettings from "./components/users/settings/UserSettings";
// import NewInvoice from "./components/users/new_invoice/NewInvoice";
// import UserHome from "./components/users/user_home/UserHome";
// import ViewInvoice from "./components/users/view_Invoice/ViewInvoice";
// import Admin from "./components/admin/admin_main/Admin";
// // import AdminStats from "./components/admin/AdminStats";
// import OwnerManagement from "./components/admin/admin_ownerlist/OwnerManagement";
// import UserList from "./components/admin/admin_userlist/UserList";
// import AdminLogin from "./components/admin/admin_login_logout/AdminLogin";
// import AdminRegister from "./components/admin/admin_login_logout/AdminRegister";
// import AdminSetting from "./components/admin/admin_profileSetting/AdminSetting";
// import AdminViewUser from "./components/admin/admin_userlist/AdminViewUser"; 
// import AdminViewInvoice from "./components/admin/admin_userlist/AdminViewInvoice"; 
// import AdminDashboard from "./components/admin/admin_dashboard/AdminDashboard";
// import OwnerMain from "./components/owner/owner_main/OwnerMain";
// import OwnerDashboard from "./components/owner/owner_dashboard/OwnerDashboard";
// import OwnerLogin from "./components/owner/owner_login_register/OwnerLogin";
// import OwnerRegister from "./components/owner/owner_login_register/OwnerRegister";
// import UserManagement from "./components/owner/owner_usercreate/UserManagement";
// import OwnerSetting from "./components/owner/owner_setting/OwnerSetting";
// import CreateInvoice from "./components/owner/owner_createinvoice/CreateInvoice";

// const myRouter = createBrowserRouter([
//   {
//     path: "/",
//     Component: Login,
//   },
//   {
//     path: "/home",
//     Component: Home,
//   },
//   {
//     path: "/login",
//     Component: Login,
//   },
//   {
//     path: "/register",
//     Component: Register,
//   },
//   {
//     path: "/dashboard",
//     Component: Dashboard,
//   },
//   {
//     path: "/user-dashboard",
//     Component: UserDashboard,
//     children: [
//       { path: "", Component: UserHome },
//       { path: "user-home", Component: UserHome },
//       { path: "invoice", Component: Invoices },
//       { path: "settings", Component: UserSettings },
//       { path: "new-invoice", Component: NewInvoice },
//       { path: "view-invoice", Component: ViewInvoice },
//     ],
//   },
//   {
//     path: "/admin-login",
//     Component: AdminLogin,
//   },
//   {
//     path: "/admin-register",
//     Component: AdminRegister,
//   },
//   {
//     path: "/admin",
//     Component: Admin,
//     children: [
      
//       { path: "dashboard", Component: AdminDashboard },
//       { path: "owners", Component: OwnerManagement },
//       { path: "users", Component: UserList },
//       { path: "settings", Component: AdminSetting },
//       { path: "view-user", Component: AdminViewUser }, // For viewing invoices of a specific user
//       { path: "view-invoice", Component: AdminViewInvoice }, // For viewing details of a single invoice
//     ],
//   },

//   {
//     path: "/owner-login",
//     Component: OwnerLogin,
//   },
//   {
//     path: "/owner-register",
//     Component: OwnerRegister,
//   },

//   {
//     path: "/owner",
//     Component: OwnerMain,
//     children: [
//       { path: "dashboard", Component:OwnerDashboard},
//       { path: "create-user", Component:UserManagement},
//       { path: "create-invoice", Component:CreateInvoice},
//       { path: "create-setting", Component:OwnerSetting},
//       // { path: "dashboard", Component:OwnerDashboard},
//       // { path: "dashboard", Component:OwnerDashboard},
//     ]
//     },
// ]);

// function App() {
//   return <RouterProvider router={myRouter} />;
// }

// export default App;





import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import "./App.css";

// Components
import Login from "./components/owner/login/Login";
import Register from "./components/owner/register/Register";
import Dashboard from "./components/owner/dashboard/Dashboard";
import Home from "./components/home/main/Home";
import UserDashboard from "./components/users/user_dashboard/UserDashboard";
import Invoices from "./components/users/invoices/Invoices";
import UserSettings from "./components/users/settings/UserSettings";
import NewInvoice from "./components/users/new_invoice/NewInvoice";
import UserHome from "./components/users/user_home/UserHome";
import ViewInvoice from "./components/users/view_Invoice/ViewInvoice";
import Admin from "./components/admin/admin_main/Admin";
import OwnerManagement from "./components/admin/admin_ownerlist/OwnerManagement";
import UserList from "./components/admin/admin_userlist/UserList";
import AdminLogin from "./components/admin/admin_login_logout/AdminLogin";
import AdminRegister from "./components/admin/admin_login_logout/AdminRegister";
import AdminSetting from "./components/admin/admin_profileSetting/AdminSetting";
import AdminViewUser from "./components/admin/admin_userlist/AdminViewUser"; 
import AdminViewInvoice from "./components/admin/admin_userlist/AdminViewInvoice"; 
import AdminDashboard from "./components/admin/admin_dashboard/AdminDashboard";
import OwnerMain from "./components/owner/owner_main/OwnerMain";
import OwnerDashboard from "./components/owner/owner_dashboard/OwnerDashboard";
import OwnerLogin from "./components/owner/owner_login_register/OwnerLogin";
import OwnerRegister from "./components/owner/owner_login_register/OwnerRegister";
import UserManagement from "./components/owner/owner_usercreate/UserManagement";
import OwnerSetting from "./components/owner/owner_setting/OwnerSetting";
import CreateInvoice from "./components/owner/owner_createinvoice/CreateInvoice";
import ViewAll from "./components/owner/owner_usercreate/ViewAll";
import ViewUserInvoice from "./components/owner/owner_usercreate/ViewUserInvoice";
// import HomePage from "./components/home/HomePage";

// Example authentication check (you can customize this)
const isAuthenticated = localStorage.getItem("uid") !== null; // Check if user is logged in

const myRouter = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: () => (
      <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/login">
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-dashboard",
    Component: () => (
      <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/login">
        <UserDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", Component: UserHome },
      { path: "user-home", Component: UserHome },
      { path: "invoice", Component: Invoices },
      { path: "settings", Component: UserSettings },
      { path: "new-invoice", Component: NewInvoice },
      { path: "view-invoice", Component: ViewInvoice },
    ],
  },
  {
    path: "/admin-login",
    Component: AdminLogin,
  },
  {
    path: "/admin-register",
    Component: AdminRegister,
  },
  {
    path: "/admin",
    Component: () => (
      <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/admin-login">
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "owners", Component: OwnerManagement },
      { path: "users", Component: UserList },
      { path: "settings", Component: AdminSetting },
      { path: "view-user", Component: AdminViewUser },
      { path: "view-invoice", Component: AdminViewInvoice },
    ],
  },
  {
    path: "/owner-login",
    Component: OwnerLogin,
  },
  {
    path: "/owner-register",
    Component: OwnerRegister,
  },
  {
    path: "/owner",
    Component: () => (
      <ProtectedRoute isAuthenticated={isAuthenticated} redirectTo="/owner-login">
        <OwnerMain />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", Component: OwnerDashboard },
      { path: "create-user", Component: UserManagement },
      { path: "view-invoice", Component: ViewUserInvoice },
      { path: "view-all-invoice", Component: ViewAll },
      { path: "create-invoice", Component: CreateInvoice },
      { path: "create-setting", Component: OwnerSetting },
    ],
  },
]);

function App() {
  return <RouterProvider router={myRouter} />;
}

export default App;
