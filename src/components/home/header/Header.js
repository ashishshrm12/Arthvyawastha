import React from 'react'
import logo_light from "../../../assets/logo-bl.png";
import logo_Dark from "../../../assets/logo-wh.png";
import toggle_light from "../../../assets/night.png";
import toggle_dark from "../../../assets/day.png";
import './header.css'

const Header = ({theme, setTheme}) => {
    const toggle_mode=()=>{
        theme==='light' ? setTheme('dark') : setTheme('light');
      }
  return (
    <div className="header">
      <img src={theme==='light'? logo_light:logo_Dark} alt="" className="logos" />

      <ul className="head-table">
        <li>Features</li>
        <li>About</li>
        <li>Contact</li>
        <li>Privacy & Policy</li>
        <li>Get Started</li>
      </ul>

      

      <img onClick={()=>toggle_mode()} alt="" src={theme==='light'?toggle_light:toggle_dark} className="toggle-icons" />
    </div>
  )
}

export default Header
