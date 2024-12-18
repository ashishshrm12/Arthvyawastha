import React from 'react'
import { Link } from 'react-router-dom'
import '../../../components/home/footer/footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div class="ff">
        <div class="row">
          <div class="col">
            <img src="logo-modified.png" alt="" class="logo" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
              vel culpa velit ratione minus praesentium possimus quam, magnam
              consequuntur voluptates vero unde excepturi.
            </p>
          </div>
  
          <div class="col">
            <h3>office <div class="underline"><span></span></div></h3>
            <p>Housefed Complex</p>
            <p>Banur, Patiala</p>
            <p>Punjab, PIN 140601, India</p>
            <p class="email-id">seekho@gmail.com</p>
            <h4>+91-0123456789</h4>
          </div>
  
          <div class="col">
            <h3>links <div class="underline"><span></span></div></h3>
            <ul>
              <li><Link to="#home">home</Link></li>
              <li><Link to="#about">about us</Link></li>
              <li><Link to="#services">Services</Link></li>
              <li><Link to="#features">Features</Link></li>
              <li><Link to="#contact">contacts</Link></li>
            </ul>
          </div>
  
          <div class="col">
            <h3>newsletters <div class="underline"><span></span></div></h3>
            <form action="">
              <i class="fa-regular fa-envelope"></i>
              <input type="email" placeholder="Enter your mail" required/>
              <button type="submit"><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
        </form>
            <div class="social-icon">
              <Link to={"/register"} class="fab fa-facebook-f"></Link>
              <Link to={""} class="fab fa-x-twitter"></Link>
              <Link to={"#"} class="fab fa-instagram"></Link>
              <Link to={"#"} class="fab fa-github"></Link>
            </div>
          </div>
        </div>
        <hr />
        <div class="text-center">
          Copyright &copy; Arthvavyastha team | All right reserved
        </div>
      </div>
    </div>
  )
}

export default Footer
