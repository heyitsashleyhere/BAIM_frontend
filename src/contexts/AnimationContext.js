import React, { useState, useEffect } from "react";

export const AnimationContext = React.createContext();

export const AnimationContextProvider = ({ children }) => {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
		<AnimationContext.Provider value={{ windowWidth }}
		>
			{children}
		</AnimationContext.Provider>
	);
};
