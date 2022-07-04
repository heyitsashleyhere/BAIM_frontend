import { useState, useEffect } from "react";
import * as BsIcons from "react-icons/bs";
import "./scrollToTop.scss";

const ScrollToTop = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 200 ? setIsScrolled(true) : setIsScrolled(false);
		});
	});

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
					<BsIcons.BsArrowUpSquare className="scroll-btn" />
					<BsIcons.BsFillArrowUpSquareFill className="scroll-btn-hover" />
				</span>
			)}
		</div>
	);
};

export default ScrollToTop;
