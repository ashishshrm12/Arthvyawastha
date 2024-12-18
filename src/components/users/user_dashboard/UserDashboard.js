import React from "react";
import "../../../components/users/user_dashboard/UserDashboard.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

const UserDashboard = () => {
  const nagivation=useNavigate()
  const logout = () => {
    signOut(auth).then(() => {
        localStorage.clear()
        nagivation('/login')
      })
      .catch((error) => {
        console.log(error);
        
      });
  };
  return (
    <div className="user-dashboard">
      <div className="side-nav">
        <div className="profile-info">
          <img src={localStorage.getItem("photoURL")} alt="" />
          <div className="profile-name">
            <p>{localStorage.getItem("userName")}</p>
            <button onClick={logout}>Logout{' '}<i className="fa-solid fa-right-from-bracket"></i></button>
          </div>
        </div>
        <hr />
        <div className="menu">
          {/* <Link to={"/home"} className="menu-link"><i className="fa-solid fa-house"></i>
            Home
          </Link> */}
          <Link to={"/user-dashboard/user-home"} className="menu-link"><i className="fa-solid fa-chart-line"></i>
            Dashboard
          </Link>
          <Link to={"/user-dashboard/invoice"} className="menu-link"><i className="fa-solid fa-file-invoice"></i>
            Invoice
          </Link>
          <Link to={"/user-dashboard/new-invoice"} className="menu-link"><i className="fa-solid fa-file-circle-plus"></i>
            New Invoice
          </Link>
          <Link to={"/user-dashboard/settings"} className="menu-link"><i className="fa-solid fa-gear"></i>
            Settings
          </Link>
        </div>
      </div>

      <div className="user-container">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
