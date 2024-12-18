import React, { useState } from 'react'
import Header from "../header/Header";
import bg_img from "../../../assets/home-img1.jpg";
import './Home.css'
import Footer from '../footer/Footer';
const Home = () => {
  const [theme,setTheme]=useState('dark')
  return (
    <div className={`home ${theme}`}>
      <Header theme={theme} setTheme={setTheme}/>

      <section className='home-wrapper'>
        <div className='paddings innerWidth flexCenter home-container'>
          
          <div className='home-left'>

          </div>

          <div className='flexCenter home-right'>
            <div className='image-container'>
              {/* <img src={bg_img} alt=''/> */}
            </div>
          </div>

        </div>
      </section>
      <Footer/>
      
    </div>
  )
}

export default Home
