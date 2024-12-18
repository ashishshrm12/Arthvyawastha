import React , {useState} from 'react'
import Navbar from '../navbar/Navbar';
import './dashboard.css';

const Dashboard = () => {
  const [theme,setTheme]=useState('dark')
  return (
    <div className={`dashboard ${theme}`}>
    <Navbar theme={theme} setTheme={setTheme} />

      
    </div>
  )
}

export default Dashboard;
