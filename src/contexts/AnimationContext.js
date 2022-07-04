import React, { useState, useEffect, useRef } from "react";

export const AnimationContext = React.createContext();

export const AnimationContextProvider = ({ children }) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isNav, setIsNav] = useState(false);

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
		<AnimationContext.Provider value={{ windowWidth, isNav, setIsNav }}>
			{children}
		</AnimationContext.Provider>
	);
};
