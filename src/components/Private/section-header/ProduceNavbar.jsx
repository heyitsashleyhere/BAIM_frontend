import { useState, useEffect, useContext, useRef } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { SeasonalAvatar } from "../Avatars-Links/Avatars";

import "./produceNavbar.scss";
import More from "../../../assets/images/more-icon.svg";

export const ProduceNavbar = () => {
	const { seasonal } = useContext(PostsContext);

	const date = new Date();
	let currentMonth = date
		.toLocaleString("default", { month: "long" })
		.split(" ")[0]
		.toLowerCase();

	const inSeason = seasonal.filter((produce) => {
		// return produce.in_season.filter(month => month === currentMonth).length
		return produce.in_season.some((month) => month === currentMonth);
	});

	const firstSix = inSeason.filter((_, idx) => idx < 10);
	// let randomSeven = inSeason.sort(() => Math.random() - 0.5).slice(0, 7);

	// const [position, setPosition] = useState(window.screenY);
	// const [visible, setVisible] = useState(true);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		let scrolling = window.scrollY;

	// 		setVisible(position > scrolling);
	// 		setPosition(scrolling);
	// 	};
	// 	window.addEventListener("scroll", handleScroll);

	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// });

	return (
		<section className="produce-nav">
			<section className="produce-nav-container">
				<section className="avatars">
					{firstSix.map(({ id, name, image }, index) => (
						<SeasonalAvatar id={id} name={name} image={image} key={index} />
					))}
					<SeasonalAvatar id="plus" name="More" image={More} key="more" />
				</section>
			</section>
		</section>
	);
};
