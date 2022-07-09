import { useEffect, useRef, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
// context
import { AnimationContext } from "../../../contexts/AnimationContext";
// Styles
import "./header.scss";
import Logo from "../../../assets/logo/raspberry.png";

const Header = () => {
	const { windowWidth, setIsNav } = useContext(AnimationContext);

	const headerRef = useRef(null);

	const styling = windowWidth >= 768 ? "grid" : "flex";

	useEffect(() => {
		const tl = gsap.timeline();
		tl.to(headerRef.current, {
			duration: 1,
			y: 0,
			ease: "power2.inOut",
			delay: 2.2,
		});
	}, []);

	return (
		<header ref={headerRef} className="header" style={{ display: styling }}>
			<div className="header-logo">
				<NavLink
					to="/"
					onClick={() => {
						setIsNav(false);
						localStorage.removeItem("showNav");
					}}
				>
					<img src={Logo} alt="LOKA" />
				</NavLink>
				<NavLink className="NavLink-White" to="/main">
					Loka
				</NavLink>
			</div>

			<nav className="navbar">
				<ul className="navbar-list">
					<li className="navbar-list-item">
						<NavLink className="NavLink-White" to="/team">
							team
						</NavLink>
					</li>
					<li className="navbar-list-item">
						<NavLink className="NavLink-White" to="/about">
							about
						</NavLink>
					</li>
					<li className="navbar-list-item">
						<NavLink className="NavLink-White" to="/auth">
							login
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
