import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import "./discoverNavbar.scss";

export const DiscoverNavbar = () => {
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
			name: "Arts & Craft",
			src: require("../../../assets/images/Seasonal.jpg"),
			path: "/artsCraft",
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
			name: "Events",
			src: require("../../../assets/images/buy.jpg"),
			path: "/events",
			description:
				"find your local Markets and sellers in your city and neighborhood",
			collection: "115 garderns",
		},
	];

	return (
		<section className="discover-nav">
			<section className="discover-nav-categories">
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
		</section>
	);
};
