import { useState, useEffect, useContext } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { Link, useLocation } from "react-router-dom";
import { SeasonalAvatar } from "../Avatars-Links/Avatars";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./produceNav.scss";
// import { More } from "@mui/icons-material";
import More from "../../../assets/images/more-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export const ProduceNav = () => {
	const { seasonal } = useContext(PostsContext);
	const [show, setShow] = useState(true);
	const location = useLocation();

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

	const discover = [
		{
			id: 1,
			name: "Garden",
			src: require("../../../assets/images/gardens.jpg"),
			path: "/garden",
			description:
				"Curious about gardening? share your thoughts, ask  your questions, find your support",
			collection: "115 garderns",
		},
		{
			id: 2,
			name: "Seasonal",
			src: require("../../../assets/images/seasonal.jpg"),
			path: "/seasonal",
			description:
				"find your local Markets and sellers in your city and neighborhood",
			collection: "115 garderns",
		},
		{
			id: 3,
			name: "Recipes",
			src: require("../../../assets/images/recipes.jpg"),
			path: "/recipe",
			description:
				"find your local Markets and sellers in your city and neighborhood",
			collection: "115 garderns",
		},
		{
			id: 4,
			name: "Beauty",
			src: require("../../../assets/images/beauty.jpg"),
			path: "/beauty",
			description:
				"find your local Markets and sellers in your city and neighborhood",
			collection: "115 garderns",
		},
		{
			id: 5,
			name: "Community",
			src: require("../../../assets/images/growing.jpg"),
			path: "/community",
			description:
				"find your local Markets and sellers in your city and neighborhood",
			collection: "115 garderns",
		},
		{
			id: 6,
			name: "events",
			src: require("../../../assets/images/buy.jpg"),
			path: "/event",
			description:
				"find your local Markets and sellers in your city and neighborhood",
			collection: "115 garderns",
		},
	];

	useEffect(() => {
		// console.log(location.pathname)
		if (location.pathname === "/discover") {
			setShow(false);
		}
	}, [location]);

	const [position, setPosition] = useState(window.screenY);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			let scrolling = window.scrollY;

			setVisible(position > scrolling);
			setPosition(scrolling);
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	return (
		<section className="section-nav">
			<section className="section-nav-container">
				<section className={`${visible ? "avatars" : "hidden"}`}>
					{firstSix.map(({ id, name, image }, index) => (
						<SeasonalAvatar id={id} name={name} image={image} key={index} />
					))}
					<SeasonalAvatar id="plus" name="More" image={More} key="more" />
				</section>
				{show && (
					<section className="categories">
						<ul>
							{discover.map((category, index) => (
								<li key={category.id} className="category">
									<Link to={category.path}>
										<p className="LokaB">{category.name}</p>
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}
			</section>
		</section>
	);
};
