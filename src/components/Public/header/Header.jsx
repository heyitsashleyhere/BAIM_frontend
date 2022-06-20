
import { useState, useEffect, useRef, useContext } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimationContext } from '../../../contexts/AnimationContext'

import gsap from 'gsap'

import './header.scss'
import Logo from '../../../assets/logo/raspberry.png'


const Header = () => {


  const { show, handleGsapTiming, windowWidth } = useContext(AnimationContext)
  const headerRef = useRef(null)

    const location = useLocation()
    console.log(location)

  const styling = windowWidth >= 768 ? 'grid' : 'flex'

  useEffect(() => {
      const tl = gsap.timeline()
      tl.to(headerRef.current, {
        duration: 1,
        y: 0,
        ease: 'power2.inOut'
      })
  }, [])

  return (
    <header ref={headerRef} className="header"
      style={{ display: styling }}
    >
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