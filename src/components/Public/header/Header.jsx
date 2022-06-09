import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'

import './header.scss'
// import Berries from '../../../../public/landingVideos/berries(1).webm'
import Logo from '../../../assets/logo/raspberry.png'


const Header = () => {

    const headerRef = useRef(null)


  useEffect(() => {
    gsap.to(headerRef.current, {
      duration: 0.8,
      y: 0,
      ease: 'power2.inOut'
    },'+=9.5')
  }, [])

  return (
    <header ref={headerRef} className="header">
      <div className="header-logo">
        <img src={Logo} alt="LOKA" /> 
        <Link to="/">Loka</Link>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/team">team</Link>
        
          </li>
          <li className="nav-item">
          <Link to='/about'>about</Link>
            
          </li>
          <li className="nav-item">
          <Link to='login'>login</Link>
          </li>
        </ul>
      </nav>

    </header>

  )
}

export default Header