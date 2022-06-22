import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import gsap from 'gsap'
import * as Icons from "react-icons/md";

import './AppHeader.scss'
import Logo from '../../../assets/logo/raspberry.png'

export const AppHeader = () => {
  const [mobile, setMobile] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);

  // refs to elements to be included in the animation
  const sideNavRef = useRef(null);
  const sideNavBgRef = useRef(null);
  const searchRef = useRef(null);

  //the links ref array 
  const navItemsRef = useRef([])
  navItemsRef.current = [];

  const tl = useRef(null);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })

    tl.current.to(sideNavRef.current, {
      duration: 0,
      display: 'block',
      ease: 'power2'
    })
    tl.current.from(sideNavBgRef.current, {
      duration: 0.5,
      x: '100%',
      ease: 'power2.inOut'
    })
    tl.current.fromTo([navItemsRef.current, searchRef.current], {
      opacity: 0
    }, {
      duration: 0.6,
      opacity: 1,
      ease: 'power2.inOut',
      stagger: 0.2
    }, '-=0.3')
  }, [])
  
  
  //burgerMenu state triggers timeline back and forward
  useEffect(() => {
    burgerMenu ? tl.current.play() : tl.current.reverse();
  }, [burgerMenu])

  // if the screen size is less than 768px then setState to true and then display burger menu;
  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    }
  }, []);
  
  
  // to check the screen size to display the corresponding navigation links
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <768) {
        setMobile(true);
      } else {
        setMobile(false);
        setBurgerMenu(false);
      }
    };

    //listening on the window resize event
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // a function to add multiple refs to an array to animate them together
  const addToLinks = (link) => {
    navItemsRef.current.push(link)
  }

  //closing the siddebar on link click event
  const {pathname} = useLocation()
  useEffect(() => {
    setBurgerMenu(false)
  }, [pathname])

  return (
    <>
    <header className="app-header">
      <div className="app-header-logo">
        <img src={Logo} alt="LOKA" /> 
        <Link to="/main">Loka</Link>
      </div>
      {mobile ? (
        <div className="mobile-toggle">
          <div className="mobile-toggle-icons">
              <Icons.MdMenu className="toggle-icon" />
          </div>
        </div>
        ) : (
            //desktop navbar
          <nav className="navbar">
            <ul className="nav-list">
              {links.map((link, i) => {
                return (
                  <>
                    <li className="nav-item" onClick={() => setBurgerMenu(false)} >
                      <Link to={link.path} key={link.name} ref={addToLinks} >{link.name}</Link>
                    </li>
                  </>
                )
              })}
              <li className="nav-item">
                <input type="" placeholder="Search" className="search"/>
                <Icons.MdOutlineSearch className="search-icon" />
              </li>
            </ul>
          </nav>
        )}
      </header>

      //mobile navbar
        <div ref={sideNavRef} className="burger-menu">
        <div ref={sideNavBgRef} className="burger-menu-inner">
          <ul className="burger-menu-list">
            {links.map((link, i) => {
              return (
                <>
                  <li className="burger-menu-list-item">
                    <Link to={link.path} key={i} ref={addToLinks} >{link.name}</Link>
                  </li>
                </>
              )
            })}
            <li ref={searchRef} className="burger-menu-list-item">
              <input type="" placeholder="Search" className="mobile-search"/>
              <Icons.MdOutlineSearch className="search-icon" />
            </li>
          </ul>
          
          <Icons.MdClose className='close-icon' onClick={() => setBurgerMenu(false)} />
          </div>
        </div>
    </>
  );
}

export default AppHeader;

//Links object
const links =
  [
    {path: '/discover', name: 'Discover'},
    {path: '/feed', name: 'Feed'},
    {path: '/profile', name: 'Profile'},
    {path: '/create', name: 'Create'}
  ]