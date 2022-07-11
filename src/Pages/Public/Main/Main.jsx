import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/src/all";
// Styles
import "./main.scss";
import "../../../../src/app.scss";
// Logo
import Logo from "../../../assets/logo/loka-logo.png";

gsap.registerPlugin(ScrollTrigger);

const promoVideos = [
		{
		class:"promo-welcome",
		header: "Search",
		image:require('../../../assets/images/seasonalLoka.png'),
		title: "we keep you informed ",
		text: "At Loka we provide to our users a produce seasonal Api for all seasons. Either you want to plant or to know when is the rigth time to eat the veggies and fruits planted in your country."
	},
	{
		class:"promo-create",
		header: "CREATE * SHARE * COLLECT * INSPIRE",
		image:require('../../../assets/images/collectionsNoback.png'),
		title:"Always with you to inspire and remember",
		text:"Create your collection of recipes, your home-made beauty solutions, save posts of D.I.Y. or how to plant in your balcony... whatever suits you Loka got it !!"
	},
	{
		class:"promo-connect",
		header: "CONNECT",
		image:require('../../../assets/avatars_2-removebg-preview.png'),
		title: "Create your community",
		text:"At Loka you can follow other users, comment on your favorite posts and save all you dont want to forget"
	},

];

const Main = () => {
	//refs used for gsap animation
	const overlayRef = useRef(null);
	const imageRef = useRef(null);
	const sloganRef = useRef(null);

	//a function to add multiple refs to an array
	const videosRef = useRef([]);
	videosRef.current = [];

	//Main page Animations
	useEffect(() => {
		const tl = gsap.timeline();
		tl.to(overlayRef.current, {
			duration: 1,
			opacity: 1,
			backgroundColor: `#000000`,
			ease: "power2.inOut",
		})
			.to(imageRef.current, {
				y: 0,
				duration: 0.8,
				opacity: 1,
				ease: "power2.inOut",
			})
			.to(sloganRef.current, {
				y: 0,
				duration: 0.8,
				ease: "power2.inOut",
			});
	}, []);

	//revealing promo sections and promo video onscroll animation
	useEffect(() => {
		videosRef.current.forEach((video) => {
			ScrollTrigger.create({
				trigger: video,
				start: "top 70%",
				end: "bottom 30%",
				onEnter: () => video.play(),
				onEnterBack: () => video.play(),
				onLeave: () => video.pause(),
				onLeaveBack: () => video.pause(),
			});
		});
	}, []);

	//adding promo videos to an array for ScrollTrigger
	const addToRefs = (el) => {
		videosRef.current.push(el);
	};

	return (
		<section className="main">
			<section className="cta-section" ref={overlayRef}>
				<section className="cta-section-content">
					<img ref={imageRef} src={Logo} alt="LOKA" className="logo" />
					<section className="slogan">
						<h1 ref={sloganRef}>Lokalisieren</h1>
					</section>
				</section>
			</section>

			<section className="promo-section">
				{promoVideos.map((video, index) => {
					return (
						<section key={`promo${index}`} className="promo-section-content">
							<section
								className={`promo-section-content-text ${video.class}`}
								key={`text${index}`}
							>
								<h1 className="text">{video.header}</h1>
								<h2>{video.title}</h2>
								<img src={video.image}></img>
								<section className="hero-text">
									<p>{video.text}</p>
								</section>
							</section>
							<section
								className="promo-section-content-media"
								key={`video${index}`}
							>
								{/* <video
									ref={addToRefs}
									className="promo-vid"
									src={video.src}
									type="video/webm"
									autoPlay
									loop
									muted
									playsInline
								/> */}
							</section>
						</section>
					);
				})}
			</section>
		</section>
	);
};

export default Main;
