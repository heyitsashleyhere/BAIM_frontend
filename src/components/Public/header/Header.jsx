
import { useEffect, useRef, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimationContext } from '../../../contexts/AnimationContext'

import gsap from 'gsap'

import './header.scss'
import Logo from '../../../assets/logo/raspberry.png'


const Header = () => {
  const { windowWidth } = useContext(AnimationContext)

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
        <img src={Logo} alt="LOKA" /> 
        <NavLink to="/main">Loka</NavLink>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/team">team</NavLink> 
          </li>
          <li className="nav-item">
            <NavLink to='/about'>about</NavLink>  
          </li>
          <li className="nav-item">
            <NavLink to='/auth'>login</NavLink>
          </li>
        </ul>
      </nav>
    </header>

  )
}

export default Header