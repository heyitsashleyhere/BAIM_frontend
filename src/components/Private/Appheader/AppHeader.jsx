import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import gsap from "gsap";
// contexts
import { UserContext } from '../../../contexts/UserContext.js'
import {AnimationContext} from '../../../contexts/AnimationContext'
// component
import SearchBar from '../SearchBar/SearchBar.jsx';
// styles and icons
import * as Icons from "react-icons/md";
import "./AppHeader.scss";
import Logo from "../../../assets/logo/raspberry-black.png";


export const AppHeader = () => {
  let navigate = useNavigate()
  const [cookies] = useCookies();
  const { setIsLogin, user } = useContext(UserContext)
  
  const [isMobile, setIsMobile] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);

  //Links object
  const links =
    [
      {path: '/discover', name: 'Discover'},
      {path: '/feed', name: 'Feed'},
      {path: `/profile/${cookies.profileName}`, name: 'Profile'},
      {path: '/create', name: 'Create'},

  ]

  // refs to elements to be included in the animation
  const sideNavRef = useRef(null);
  const sideNavBgRef = useRef(null);
  const logoutRef = useRef(null);

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
    tl.current.fromTo([navItemsRef.current, logoutRef.current], {
      opacity: 0
    }, {
      duration: 0.6,
      opacity: 1,
      ease: 'power2.inOut',
      stagger: 0.2
    }, '-=0.3')
  }, [])
  
  
  //burgerMenu state triggers timeline back and htmlForward
  useEffect(() => {
    burgerMenu ? tl.current.play() : tl.current.reverse();
  }, [burgerMenu])


    //to handle window.width and render the produce navbar only for desktop
  const { windowWidth } = useContext(AnimationContext)

  console.log(windowWidth)
  useEffect(() => {
    setIsMobile(windowWidth < 768 ? true : false)
    setBurgerMenu(false)
  }, [windowWidth])


  // a function to add multiple refs to an array to animate them together
  const addToLinks = (link) => {
    navItemsRef.current.push(link)
  }

  //closing the sidebar on link click event
  const {pathname} = useLocation()

  const onLinkClick = (link) => {
    setBurgerMenu(false)
    sideNavRef.current.style.display = "none"
  }
  useEffect(() => {
    onLinkClick()
  }, [sideNavRef, pathname])


  
  function logoutUser() {
    const config = {
      method: "POST",
      credentials: 'include', // specify this if you need cookies
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:7000/user/logout", config)
    .then((response) => response.json())
    .then((result) => {
        // console.log("UserLogin:", result);
        if(!result.errors) { 
          console.log('result.message :>> ', result.message);
          setIsLogin(false)
          localStorage.clear()
          navigate('/main')
        } else {
          console.log('errors :>> ', result.errors);
        }
      })
    .catch((error) => console.log(error));

  }


  return (
    <>
    <header className="app-header">
      <div className="app-header-logo">
        <img src={Logo} alt="LOKA" /> 
        <Link  className="LokaB" to="/main">Loka</Link>
      </div>
      {isMobile ? (
        <div className="mobile-toggle">
          <div className="mobile-toggle-icons">
              <Icons.MdMenu className="toggle-icon" onClick={() => setBurgerMenu(true)}/>
          </div>
        </div>
       ) : (
        //desktop navbar
        <nav className="navbar">
          <ul className="nav-list">
              {links.map((link, i) => {
                return (
                    <li className="nav-item" key={i}>
                      <Link className="LokaB" to={link.path} key={link.name}>{link.name}</Link>
                    </li>
                )
              })}

                <li className="nav-item">
                  <h1 className="btn LokaB" onClick={logoutUser} >Logout</h1>
                </li>

            </ul>
          </nav>
      )}
      </header>

      {/* //mobile navbar */}
        <div ref={sideNavRef} className="burger-menu">
        <div ref={sideNavBgRef} className="burger-menu-inner" >
          <ul className="burger-menu-list">
            {links.map((link, i) => {
              return (
                <li className="burger-menu-list-item" key={i}>
                  <Link to={link.path} key={i} ref={addToLinks} onClick={onLinkClick}>{link.name}</Link>
                </li>
              )
            })}
            <li className="burger-menu-list-item" key="mobile-logout">
              <h1 ref={logoutRef} className="btn" onClick={logoutUser} >Logout</h1>
            </li>
          </ul>
          
          <Icons.MdClose className='close-icon' onClick={() => setBurgerMenu(false)} />
          </div>
      </div>
    </>
  )
}

export default AppHeader;