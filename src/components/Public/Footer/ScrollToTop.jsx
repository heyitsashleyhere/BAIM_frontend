import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import "./scrollToTop.scss";

const ScrollToTop = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	const [iconColor, setIconColor] = useState(null);
	const { pathname } = useLocation();
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setIsScrolled(window.scrollY > 200 ? true : false);
		});
	}, [isScrolled]);

	useEffect(() => {
		if (
			pathname.includes("/main") ||
			pathname.includes("/about") ||
			pathname.includes("/team")
		) {
			setIconColor(true);
		} else {
			setIconColor(false);
		}
	}, [pathname, iconColor]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="scroll-btn-container">
			{isScrolled && (
				<span className="scroll" onClick={scrollToTop}>
					<BsIcons.BsArrowUpSquare
						className={`scroll-btn ${iconColor ? "public" : ""}`}
					/>
					<BsIcons.BsFillArrowUpSquareFill
						className={`scroll-btn-hover ${iconColor ? "public" : null}`}
					/>
				</span>
			)}
		</div>
	);
};

export default ScrollToTop;
