import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AnimationContext } from "../../../contexts/AnimationContext";

import gsap from "gsap";
import * as Icons from "react-icons/md";

import "./AppHeader.scss";
import Logo from "../../../assets/logo/raspberry.png";

export const AppHeader = () => {
  const [mobile, setMobile] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);


  // Search and Filter
  const [ searchCriteria, setSearchCriteria] = useState("criteria")
  console.log("dskfösk:", searchCriteria);
  // Search and Filter ends

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
        setBurgerMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="app-header">
        <div className="app-header-logo">
          <img src={Logo} alt="LOKA" />
          <Link to="/main">Loka</Link>
        </div>
        {mobile ? (
          <div className="mobile-toggle">
            <div
              className="mobile-toggle-icons"
              onClick={() => setBurgerMenu(!burgerMenu)}
            >
              {/* burgerMenu && */}
              <Icons.MdMenu className="toggle-icon" />
            </div>
          </div>
        ) : (
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/discover">Discover</Link>
              </li>
              <li className="nav-item">
                <Link to="/feed">Feed</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/create">Create</Link>
              </li>

              {/* seatch bar */}
              <li className="nav-item search-bar">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search"
                  className="search"
                />

                <div className="dropdown-wrapper">

                  <div className="search-criteria-select">
                    <p>{searchCriteria}</p>
                    <button>^</button>
                  </div>

                  <div class="dropdown-content">
                    <div className="search-criterias">
                      <input
                        id="all-posts"
                        className="search-criteria-option"
                        name="search-criteria-option"
                        type="radio"
                        checked={ searchCriteria === "all-posts" }
                        value="all-posts" onClick={() => setSearchCriteria("all-posts")}
                      />
                      <label for="all-posts"><p>all-pos</p>ts</label>
                    </div>

                    <div className="search-criterias">
                      <input
                        id="events"
                        className="search-criteria-option"
                        name="search-criteria-option"
                        type="radio"
                        checked={ searchCriteria === "events" }
                        value="events" onClick={() => setSearchCriteria("events")}
                      />
                      <label for="events"><p>events</p></label>
                    </div>

                    <div className="search-criterias">
                      <input
                        id="recipes"
                        className="search-criteria-option"
                        name="search-criteria-option"
                        type="radio"
                        checked={ searchCriteria === "recipes" }
                        value="recipes" onClick={() => setSearchCriteria("recipes")}
                      />
                      <label for="recipes"><p>recipes</p></label>
                    </div>

                    <div className="search-criterias">
                      <input
                        id="arts-craft"
                        className="search-criteria-option"
                        name="search-criteria-option"
                        type="radio"
                        checked={ searchCriteria === "arts-craft" }
                        value="arts-craft" onClick={() => setSearchCriteria("arts-craft")}
                      />
                      <label for="arts-craft"><p>arts-cr</p>aft</label>
                    </div>

                    <div className="search-criterias">
                      <input
                        id="beautie"
                        className="search-criteria-option"
                        name="search-criteria-option"
                        type="radio"
                        checked={ searchCriteria === "beautie" }
                        value="beautie" onClick={() => setSearchCriteria("beautie")}
                      />
                      <label for="beautie"><p>beautie</p></label>
                    </div>

                    <div className="search-criterias">
                      <input
                        id="garden"
                        className="search-criteria-option"
                        name="search-criteria-option"
                        type="radio"
                        checked={ searchCriteria === "garden" }
                        value="garden" onClick={() => setSearchCriteria("garden")}
                      />
                      <label for="garden"><p>garden</p></label>
                    </div>

                    <div className="search-criterias">
                      <input
                        id="users"
                        className="search-criteria-option"
                        name="search-criteria-option"
                        type="radio"
                        checked={ searchCriteria === "users" }
                        value="users" onClick={() => setSearchCriteria("users")}
                      />
                      <label for="users"><p>users</p></label>
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

      <div className={burgerMenu ? "burger-menu active" : "burger-menu"}>
        <ul className="burger-menu-list">
          <li className="burger-menu-list-item">
            <Link to="/discover">Discover</Link>
          </li>
          <li className="burger-menu-list-item">
            <Link to="/feed">Feed</Link>
          </li>
          <li className="burger-menu-list-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="burger-menu-list-item">
            <Link to="/create">Create</Link>
          </li>
          <li className="burger-menu-list-item">
            <input type="" placeholder="Search" className="mobile-search" />
            <Icons.MdOutlineSearch className="search-icon" />
          </li>
        </ul>

        <Icons.MdClose
          className="close-icon"
          onClick={() => setBurgerMenu(false)}
        />
      </div>
    </>
  );
};

export default AppHeader;
