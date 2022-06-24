import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// contexts
import {UserContext} from '../../../contexts/UserContext.js'
import { DataContext } from "../../../contexts/dataContext.js"



import gsap from "gsap";
import * as Icons from "react-icons/md";

import "./AppHeader.scss";
import Logo from "../../../assets/logo/raspberry.png";

export const AppHeader = () => {
  const { setIsLogin } = useContext(UserContext)
  const [mobile, setMobile] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);

  // Search and Filter /////////

  const { searchCriteria, setSearchCriteria, searchHandler } = useContext(DataContext)

  const [ dropdownOpen, setDropdownOpen ] = useState(false)
  
  
  // Search and Filter ends /////////

  // refs to elements to be included in the animation
  const sideNavRef = useRef(null);
  const sideNavBgRef = useRef(null);
  const searchRef = useRef(null);
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
    tl.current.fromTo([navItemsRef.current, searchRef.current, logoutRef.current], {
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
    // console.log(sideNavRef.current.style.display );
    const handleResize = () => {
      if (window.innerWidth < 768) {
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

  //closing the sidebar on link click event
  const {pathname} = useLocation()

  const onLinkClick = (link) => {
    setBurgerMenu(false)
    sideNavRef.current.style.display = "none"
  }
  useEffect(() => {
    onLinkClick()
  }, [sideNavRef, pathname])

  const navigate = useNavigate()
  
  const logoutUser = () => {
    setIsLogin(false)
    navigate('/main')
  }

  return (
    <>
    <header className="app-header">
      <div className="app-header-logo">
        <img src={Logo} alt="LOKA" /> 
        <Link  className="Loka" to="/main">Loka</Link>
      </div>
      {mobile ? (
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
                  <>
                    <li className="nav-item" >
                      <Link className="Loka" to={link.path} key={link.name}>{link.name}</Link>
                    </li>
                  </>
                )
              })}

                <li className="nav-item">
                  <h1 className="btn Loka" onClick={logoutUser} >Logout</h1>
                </li>


              {/* //////////////////////////search bar */}

              <li className="nav-item search-bar">
                <input id="search-input" type="text" placeholder="Search" className="search" onChange={searchHandler} />
                  <div className="search-criteria-select">
                      <p>{searchCriteria}</p>
                      <button onClick={() => setDropdownOpen(!dropdownOpen)} >^</button>
                  </div>
                  
                  <div className={ dropdownOpen ? "dropdown-wrapper drop-down-Open" : "dropdown-wrapper"}>
                    
                    <div className="dropdown-content">

                      <div className="search-criterias">
                      <input id="all-posts" type="radio"
                             className="search-criteria-option"
                             name="search-criteria-option"
                             checked={ searchCriteria === "all-posts" }
                             value="all-posts" onChange={() => setSearchCriteria("all-posts")} />
                      <label htmlFor="all-posts"><p>all-posts</p></label>
                    </div>

                    <div className="search-criterias">
                      <input id="events" type="radio"
                             className="search-criteria-option"
                             name="search-criteria-option"
                             checked={ searchCriteria === "events" }
                             value="events" onChange={() => setSearchCriteria("events")} />
                      <label htmlFor="events"><p>events</p></label>
                    </div>

                    <div className="search-criterias">
                      <input id="recipes" type="radio"
                             className="search-criteria-option"
                             name="search-criteria-option"
                             checked={ searchCriteria === "recipes" }
                             value="recipes" onChange={() => setSearchCriteria("recipes")}  />
                      <label htmlFor="recipes"><p>recipes</p></label>
                    </div>

                    <div className="search-criterias">
                      <input id="arts-craft" type="radio"
                             className="search-criteria-option"
                             name="search-criteria-option"
                             checked={ searchCriteria === "arts-craft" }
                             value="arts-craft" onChange={() => setSearchCriteria("arts-craft")} />
                      <label htmlFor="arts-craft"><p>arts-craft</p></label>
                    </div>

                    <div className="search-criterias">
                      <input id="beauty" type="radio"
                             className="search-criteria-option"
                             name="search-criteria-option"
                             checked={ searchCriteria === "beautie" }
                             value="beautie" onChange={() => setSearchCriteria("beautie")}  />
                      <label htmlFor="beautie"><p>beautie</p></label>
                    </div>

                    <div className="search-criterias">
                      <input id="garden" type="radio"
                             className="search-criteria-option"
                             name="search-criteria-option"
                             checked={ searchCriteria === "garden" }
                             value="garden" onChange={() => setSearchCriteria("garden")} />
                      <label htmlFor="garden"><p>garden</p></label>
                    </div>

                    <div className="search-criterias">
                      <input id="users" type="radio"
                             className="search-criteria-option"
                             name="search-criteria-option"
                             checked={ searchCriteria === "users" }
                             value="users" onChange={() => setSearchCriteria("users")} />
                      <label htmlFor="users"><p>users</p></label>
                    </div>
                  </div>
                </div>
                


                <Icons.MdOutlineSearch className="search-icon" />
              </li>
              {/* search bar end */}
            </ul>
          </nav>
      )}
      </header>

      {/* //mobile navbar */}
        <div ref={sideNavRef} className="burger-menu">
        <div ref={sideNavBgRef} className="burger-menu-inner">
          <ul className="burger-menu-list">
            <li ref={searchRef} className="burger-menu-list-item">
              <input type="" placeholder="Search" className="mobile-search"/>
              <Icons.MdOutlineSearch className="search-icon" />
            </li>
            {links.map((link, i) => {
              return (
                <>
                  <li className="burger-menu-list-item">
                    <Link to={link.path} key={i} ref={addToLinks} onClick={onLinkClick}>{link.name}</Link>
                  </li>
                </>
              )
            })}
            <li className="burger-menu-list-item">
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

//Links object
const links =
  [
    {path: '/discover', name: 'Discover'},
    {path: '/feed', name: 'Feed'},
    {path: '/profile', name: 'Profile'},
    {path: '/create', name: 'Create'}
  ]
