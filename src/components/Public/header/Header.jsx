import { useEffect, useRef, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'
// context
import { AnimationContext } from '../../../contexts/AnimationContext'
// Styles
import './header.scss'
import Logo from '../../../assets/logo/raspberry.png'


const Header = () => {
  const { windowWidth, setIsNav } = useContext(AnimationContext)

  const headerRef = useRef(null)
  const childrensRef = useRef([])
  childrensRef.current = []

  const styling = windowWidth >= 768 ? 'grid' : 'flex'


  useEffect(() => {

    // console.log(childrensRef.current);
    childrensRef.current.forEach(child => {
      const tl = gsap.timeline()
      tl.to(headerRef.current, {
        duration: 1,
        y: 0,
        ease: 'power2.inOut'
      })
    })
  }, [])


  const addToChildrens = (el) => {
    childrensRef.current.push(el)
  }

  return (
    <header ref={headerRef} className="header"
    style={{display: styling}}>
      <div ref={addToChildrens} className="header-logo">
        <NavLink to="/" 
                 onClick={ () => {
                  setIsNav(false)
                  localStorage.removeItem('showNav')
                 }} >
          <img src={Logo} alt="LOKA" /> 
        </NavLink>
        <NavLink className="Loka" to="/main">Loka</NavLink>
      </div>

      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className="Loka" to="/team">team</NavLink> 
          </li>
          <li className="nav-item">
            <NavLink className="Loka" to='/about'>about</NavLink>  
          </li>
          <li className="nav-item">
            <NavLink className="Loka" to='/auth'>login</NavLink>
          </li>
        </ul>
      </nav>
    </header>

  )
}

export default Header