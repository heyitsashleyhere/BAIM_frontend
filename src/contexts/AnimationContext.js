import React, { useState, useEffect, useRef } from "react";

export const AnimationContext = React.createContext();

export const AnimationContextProvider = ({ children }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isNav, setIsNav] = useState(false);

	const discover = [
		{
			id: 1,
			name: "Garden",
			src: require("../assets/images/gardens.jpg"),
			path: "/garden"
		},
		{
			id: 2,
			name: "Arts & Craft",
			src: require("../assets/images/artscraft.jpg"),
			path: "/artsCraft"
		},
		{
			id: 3,
			name: "Recipes",
			src: require("../assets/images/recipes.jpg"),
			path: "/recipe"
		},
		{
			id: 4,
			name: "Beauty",
			src: require("../assets/images/beauty.jpg"),
			path: "/beauty"
		},
		{
			id: 5,
			name: "Community",
			src: require("../assets/images/growing.jpg"),
			path: "/community"
		},
		{
			id: 6,
			name: "Events",
			src: require("../assets/images/buy.jpg"),
			path: "/events"
		},
	];

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return (
		<AnimationContext.Provider value={{ windowWidth, isNav, setIsNav, discover }}>
			{children}
		</AnimationContext.Provider>
	);
};
