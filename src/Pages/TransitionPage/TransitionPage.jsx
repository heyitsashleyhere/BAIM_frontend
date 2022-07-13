import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import gsap, { Quint } from "gsap";
// styles
import "./transitionPage.scss";
import Logo from "./loka-logo-black.png";
// import Logo from '../../assets/logo/'

const TransitionPage = ({isFromRegister}) => {
	const [cookies] = useCookies();
	const [isOverlay, setIsOverlay] = useState(true);
	const overlayPathIn = useRef(null);
	const overlayPathOut = useRef(null);
	const textRef = useRef(null);
	const textRef2 = useRef(null);
	let navigate = useNavigate();

	useEffect(() => {
		const tl = gsap.timeline();
		tl.set(overlayPathIn.current, {
			attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
		})
			.to(
				overlayPathIn.current,
				{
					duration: 0.8,
					ease: "power4.in",
					attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
				},
				0
			)
			.to(overlayPathIn.current, {
				duration: 0.3,
				ease: "power2",
				attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
			})

			.set(overlayPathIn.current, {
				attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
			})
			.to(overlayPathIn.current, {
				duration: 0.3,
				ease: "power2.in",
				attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
			})
			.to(overlayPathIn.current, {
				duration: 0.8,
				ease: "power4",
				attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
			})
			.from(
				[textRef.current, textRef2.current],
				{
					duration: 0.8,
					y: "100%",
					opacity: 0,
					stagger: 0.2,
					ease: Quint.easeOut,
					onComplete: function () {
						setIsOverlay(true);
					},
				},
				"-=1"
			);

		//to bottom
		const tl2 = gsap
			.timeline({
				delay: 3,
			})
			.set(overlayPathOut.current, {
				attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
			})
			.to(
				overlayPathOut.current,
				{
					duration: 0.8,
					ease: "power4.in",
					attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
				},
				0
			)
			.to(overlayPathOut.current, {
				duration: 0.3,
				ease: "power2",
				attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
			})

			.set(overlayPathOut.current, {
				attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
			})
			.to(overlayPathOut.current, {
				duration: 0.3,
				ease: "power2.in",
				attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
			})
			.to(overlayPathOut.current, {
				duration: 0.8,
				ease: "power4",
				attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
			})
			.to(
				[textRef.current, textRef2.current],
				{
					duration: 0.8,
					y: "100%",
					opacity: 0,
					stagger: 0.2,
					ease: Quint.easeOut,
					onComplete: hideOverlay,
				},
				"-=1.5"
			);
	}, []);

	const hideOverlay = () => {
		setIsOverlay(false);
		navigate(`/discover`, { replace: true });
		// if(isFromRegister) {
		// 	navigate(`/profile/${cookies.profileName}`, { replace: true });
		// } else {
		// 	navigate(`/discover`, { replace: true });
		// }
	};

	return (
		<>
			{isOverlay && (
				<section className="transition-page">
					<svg
						className="overlay"
						width="100%"
						height="100%"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
					>
						<path
							ref={overlayPathIn}
							className="transition-page-layer-one"
							vectorEffect="non-scaling-stroke"
							d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
							fill="black"
						/>
					</svg>
					<div className="transition-page-content">
						<div ref={textRef} className="user">
							<img src={cookies.avatar} alt="user avatar" />
							<h1>Hello {cookies.profileName}</h1>
						</div>
						<div ref={textRef2} className="loka">
							{/* <h1>Welcome to</h1> */}
							<img src={Logo} alt="lokal" />
						</div>
					</div>
					<span></span>
					<svg
						className="overlay2"
						width="100%"
						height="100%"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
					>
						<defs>
							<pattern
								id="img1"
								patternUnits="userSpaceOnUse"
								width="100"
								height="100"
							>
								<image href={Logo} x="0" y="0" width="100" height="100" />
							</pattern>
						</defs>
						<path
							ref={overlayPathOut}
							className="transition-page-layer-two"
							vectorEffect="non-scaling-stroke"
							d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
							fill="black"
						/>
					</svg>
				</section>
			)}
		</>
	);
};

export default TransitionPage;
