import React from "react";
import "./Navbar.css";
import logo_light from "../../../assets/logo-black.png";
import logo_Dark from "../../../assets/logo-white.png";
import search_icon_light from "../../../assets/search-w.png";
import search_icon_dark from "../../../assets/search-b.png";
import toggle_light from "../../../assets/night.png";
import toggle_dark from "../../../assets/day.png";


const Navbar = ({theme, setTheme}) => {
  const toggle_mode=()=>{
    theme==='light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <div className="navbar">
      <img src={theme==='light'? logo_light:logo_Dark} alt="" className="logo" />

      <ul className="nav-table">
        <li>Home</li>
        <li>New User</li>
        <li>Customer</li>
        <li>Bills</li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img alt="" src={theme==='light'?search_icon_light:search_icon_dark} className="search-icon"/>
      </div>

      <img onClick={()=>toggle_mode()} alt="" src={theme==='light'?toggle_light:toggle_dark} className="toggle-icon" />
    </div>
  );
};

export default Navbar;
