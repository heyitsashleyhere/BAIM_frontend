import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProduceNavbar } from "../../../components/Private/section-header/ProduceNavbar";
import { AnimationContext } from "../../../contexts/AnimationContext.js";
import "./Discover.scss";

gsap.registerPlugin(ScrollTrigger);

export const Discover = () => {
	const [index, setIndex] = useState(0);
	const delay = 2500;
	const { discover } = useContext(AnimationContext)
	const timeoutRef = useRef(null);
	const itemRef = useRef();
	const imageRef = useRef();
	const navigate = useNavigate();


	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}
	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setIndex((prevIndex) =>
					prevIndex === discover.length - 1 ? 0 : prevIndex + 1
				),
			delay
		);
		return () => {
			resetTimeout();
		};
	}, [index]);

	const handleMouseOver = (e, idx) => {
		clearTimeout(timeoutRef.current);
		setIndex(idx);
		resetTimeout();
		e.target.className += " hovered";
	};

	const handleMouseLeave = (e) => {
		e.target.className -= " hovered";
		// timeoutRef.current;
		setIndex(0);
	};

	return (
		<>
			<ProduceNavbar />
			<section className="discover">
				<section className="discover-wrapper">
					<section
						className="discover-container"
						style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
					>
						{discover.map((image, index) => {
							return (
								<section className="slides-wrapper" key={image.id}>
									<section
										ref={imageRef}
										className="slide"
										key={index}
										style={{ backgroundImage: `url(${image.src})` }}
									></section>
								</section>
							);
						})}
					</section>
					<section className="discover-collection">
						{discover.map((collection, idx) => {
							return (
								<section
									key={idx}
									className="title"
									onClick={() => navigate(collection.path)}
									ref={itemRef}
									onMouseOver={(e) => handleMouseOver(e, idx)}
									onMouseLeave={(e) => handleMouseLeave(e)}
								>
									<h1 className={`${idx === index ? "active" : ""}`}>
										{collection.name}
									</h1>
								</section>
							);
						})}
					</section>
				</section>
			</section>
		</>
	);
};
