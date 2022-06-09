import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

import './header.scss'
import Logo from '../../../assets/raspberry.png'


const Header = () => {

    const headerRef = useRef(null)


  useEffect(() => {
    gsap.from(headerRef.current, {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: 'power2.inOut'
    },'+=9')
  }, [])

  return (
    <header ref={headerRef} className="header">
      <div className="header-logo">
        <img src={Logo} alt="LOKA" />
        <p>Loka</p>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className="nav-link">
              <p>team</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <p>about</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <p>login</p>
            </a>
          </li>
        </ul>
      </nav>

    </header>

  )
}

export default Header