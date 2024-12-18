import React from "react";
import "../../../components/users/user_dashboard/UserDashboard.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import './OwnerMain.css';

const OwnerMain = () => {
  const nagivation=useNavigate()
  const logout = () => {
    signOut(auth).then(() => {
        localStorage.clear()
        nagivation('/owner-login')
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
          {/* <Link to={"/home"} className="menu-links" ><i className="fa-solid fa-house"></i>
            Home
          </Link> */}
          <Link to={"/owner/dashboard"} className="menu-linkss"><i className="fa-solid fa-chart-line"></i>
            Dashboard
          </Link>
          <Link to={"/owner/create-user"} className="menu-linkss"><i className="fa-solid fa-file-invoice"></i>
            Create User
          </Link>
          <Link to={"/owner/create-invoice"} className="menu-linkss"><i className="fa-solid fa-file-circle-plus"></i>
            Create Invoice
          </Link>
          <Link to={"/owner/create-setting"} className="menu-linkss"><i className="fa-solid fa-gear"></i>
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

export default OwnerMain;