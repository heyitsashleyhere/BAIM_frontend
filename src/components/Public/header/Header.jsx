
import { useState, useEffect, useRef, useContext } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimationContext } from '../../../contexts/AnimationContext'

import gsap from 'gsap'

import './header.scss'
import Logo from '../../../assets/logo/raspberry.png'


const Header = () => {


  const { show, handleGsapTiming, windowWidth } = useContext(AnimationContext)
  const headerRef = useRef(null)

  const childrensRef = useRef([])
  childrensRef.current = []

  const location = useLocation()
  console.log(location)


  console.log(windowWidth)

  const styling = windowWidth >= 768 ? 'grid' : 'flex'

  useEffect(() => {

    console.log(childrensRef.current);

    childrensRef.current.forEach(child => {
      const tl = gsap.timeline()
      tl.fromTo(child, {
        duration: 0.8,
        y: -100,
      }, {
        y: 0,
        ease: 'power2.inOut',
        stagger: 0.2
      })
    }, `+=${handleGsapTiming(0)}`)
  }, [])
  console.log(handleGsapTiming(3))

  console.log(show);


  const addToChildrens = (el) => {
    childrensRef.current.push(el)
  }

  return (
    <header ref={headerRef} className="header"
    style={{display: show ? styling : 'none'}}>
      <div ref={addToChildrens} className="header-logo">
        <img src={Logo} alt="LOKA" /> 
        <Link to="/">Loka</Link>
      </div>
      <nav ref={addToChildrens} className="navbar">
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