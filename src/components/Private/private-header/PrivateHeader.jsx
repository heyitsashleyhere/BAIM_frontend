import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import gsap from "gsap";
// contexts
import { UserContext } from "../../../contexts/UserContext.js";
// component
import SearchBar from "../SearchBar/SearchBar.jsx";
// styles and icons
import * as Icons from "react-icons/md";
import "./privateHeader.scss";
import Logo from "../../../assets/logo/raspberry-black.png";

export const PrivateHeader = () => {
	const [burgerMenu, setBurgerMenu] = useState(false);

	const { setIsLogin, user } = useContext(UserContext);

	const [cookies] = useCookies();
	let navigate = useNavigate();
	const { pathname } = useLocation();

	const headerRef = useRef(null);

	//Links object
	const links = [
		{ path: "/discover", name: "Discover" },
		{ path: `/profile/${cookies.profileName}`, name: "Profile" },
		{ path: "/create", name: "Create" },
		{ path: "/search", name: "Search" },
	];
	
	console.log('cookies', cookies)
	function logoutUser() {
		const config = {
			method: "POST",
			credentials: "include",
			withCredentials: true, 
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
		};
		fetch("https://loka-database.herokuapp.com/user/logout", config)
			.then((response) => response.json())
			.then((result) => {
				// console.log("UserLogin:", result);
				if (!result.errors) {
					console.log("result.message :>> ", result.message);
					setIsLogin(false);
					localStorage.clear();
					navigate("/main");
				} else {
					console.log("errors :>> ", result.errors);
				}
			})
			.catch((error) => console.log(error));
	}

	const headerTl = useRef(null);
	useEffect(() => {
		pathname.includes("/profile")
			? (headerTl.current = gsap.timeline({ delay: 9 }).to(headerRef.current, {
					duration: 0.8,
					y: 0,
					ease: "power2.inOut",
			  }))
			: (headerRef.current.style.transform = "translateY(0)");
		return () => {
			if (headerTl.current) {
				headerTl.current.kill();
			}
		};
	}, []);

	return (
		<>
			<section className="private-header" ref={headerRef}>
				<div className="logo">
					<img src={Logo} alt="LOKA" />
					<Link className="NavLink-Black" to="/main">
						Loka
					</Link>
				</div>
				<div className="mobile">
					<div className="mobile-toggle">
						<Icons.MdMenu
							className="mobile-toggle-icon"
							onClick={() => setBurgerMenu(true)}
						/>
					</div>
				</div>
				{/* //desktop navbar */}
				<nav className="navbar">
					<ul className="navbar-list">
						{links.map((link, i) => {
							return (
								<li className="navbar-list-item" key={i}>
									<Link className="NavLink-Black" to={link.path} key={link.name}>
										{link.name}
									</Link>
								</li>
							);
						})}
						<li className="navbar-list-item">
							<p className="btn NavLink-Black" onClick={logoutUser}>
								Logout
							</p>
						</li>
					</ul>
				</nav>
			</section>
			<MobileMenu
				setBurgerMenu={setBurgerMenu}
				logoutUser={logoutUser}
				burgerMenu={burgerMenu}
				links={links}
			/>
		</>
	);
};

const MobileMenu = ({ setBurgerMenu, logoutUser, links, burgerMenu }) => {
	const mobileMenuRef = useRef(null);
	const mobileMenuBgRef = useRef(null);
	const mobileLogoutRef = useRef(null);
	const listItemRef = useRef([]);
	listItemRef.current = [];

	const tl = useRef(null);
	useEffect(() => {
		tl.current = gsap.timeline({ paused: true, reversed: true });

		tl.current.to(mobileMenuRef.current, {
			duration: 0,
			display: "block",
			ease: "power2.inOut",
		});
		tl.current.from(mobileMenuBgRef.current, {
			duration: 0.5,
			x: "100%",
			ease: "power2.inOut",
		});
		tl.current.fromTo(
			[listItemRef.current, mobileLogoutRef.current],
			{
				opacity: 0,
			},
			{
				duration: 0.6,
				opacity: 1,
				ease: "power2.inOut",
				stagger: 0.2,
			},
			"-=0.3"
		);
	}, []);

	//burgerMenu state triggers timeline back and htmlForward
	useEffect(() => {
		burgerMenu ? tl.current.play() : tl.current.reverse();

		return () => {
			if (tl.current) {
				tl.current.kill();
			}
		};
	}, [burgerMenu]);

	const onLinkClick = () => {
		setBurgerMenu(false);
		mobileMenuRef.current.style.display = "none";
	};


	useEffect(() => {
		onLinkClick();
	}, [mobileMenuRef]);

	// a function to add multiple refs to an array to animate them together
	const addToLinks = (link) => {
		listItemRef.current.push(link);
	};

	return (
		<section ref={mobileMenuRef} className="mobile-menu">
			<section ref={mobileMenuBgRef} className="mobile-menu-inner">
				<ul className="mobile-menu-inner-list">
					{links.map((link, i) => {
						return (
							<li className="mobile-menu-inner-list-item" key={i}>
								<Link
									to={link.path}
									key={i}
									ref={addToLinks}
									onClick={onLinkClick}
								>
									{link.name}
								</Link>
							</li>
						);
					})}
					<li className="mobile-menu-inner-list-item" key="mobile-logout">
						<p ref={mobileLogoutRef} className="btn" onClick={logoutUser}>
							Logout
						</p>
					</li>
				</ul>

				<Icons.MdClose
					className="close-icon"
					onClick={() => setBurgerMenu(false)}
				/>
			</section>
		</section>
	);
};
