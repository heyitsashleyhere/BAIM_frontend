import React, { useState, useEffect } from "react";

export const AnimationContext = React.createContext();

export const AnimationContextProvider = ({ children }) => {
	const [isEnded, setIsEnded] = useState(false);
	const [show, setShow] = useState(false);

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

	const handleGsapTiming = (num) => {
		if (windowWidth >= 992) {
			return 85 + num;
		} else {
			return 7 + num;
		}
	};

	return (
		<AnimationContext.Provider
			value={{
				isEnded,
				setIsEnded,
				show,
				setShow,
				windowWidth,
				setWindowWidth,
				handleGsapTiming,
			}}
		>
			{children}
		</AnimationContext.Provider>
	);
};
