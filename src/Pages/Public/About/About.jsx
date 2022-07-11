import { useRef, useEffect } from "react";
import gsap from "gsap";

import "./about.scss";
import plant from "../../../assets/images/growing.jpg";
import vegetables from "../../../assets/images/womenwithBasketoffood.jpg";
import gardner from "../../../assets/images/Manwithplants.jpg";
import Logo from "../../../assets/logo/raspberry.png";
import Footer from "../../../components/Public/Footer/Footer";

export default function About() {
	const imagesRef = useRef([]);
	imagesRef.current = [];

	useEffect(() => {
		const tl = gsap.timeline({
			stagger: 0.1,
		});
		imagesRef.current.forEach((image) => {
			tl.to(image, {
				duration: 0.8,
				y: 0,
				ease: "power2.inOut",
			});
		});
	}, [imagesRef]);

	const addToRefs = (e) => {
		imagesRef.current.push(e);
	};


	const promoVideo = `${process.env.PUBLIC_URL}/landingVideos/lokapromoVideo.webm`

	return (
		<section className="About">
			<section className="about_images">
				<span className="overlay">
					<img ref={addToRefs} className="plant" src={plant}></img>
				</span>
				<span className="overlay">
					<img ref={addToRefs} className="veg" src={vegetables}></img>
				</span>
				<span className="overlay">
					<img ref={addToRefs} className="man" src={gardner}></img>
				</span>
			</section>

			<section className="about_logo">
				<p>about loka ...</p>
				<img className="logo" src={Logo}></img>
			</section>

			<section className="about_text">
				<section className="inner_text">
					<p>"There is no power for change greater than a community discovering what it cares about." Margaret J. Wheatley</p>

					<p>
						Loka is about locality as a reply to our concerns about the negative
						side effects of globalization in the last decade.{" "}
					</p>

					<p>
						Our idea comes as an inspiration from Fridays for Future,
						politically Green with motives to make life in the cities more
						sustainable wile bringing communities together and to bring
						individuals or local producers closer to the city consumers.
					</p>

					<p>
						Loka is an Application that wants to produce a community library, where users can search, create , share and connect with other users,
						on topics of sustainability, planting, food, DIY and crafts. 
						Loka is passionate aboutgardening, local markets, regional produce and mostly about to share
						knowledge and resources on topics of lifestyle and DIY. Loka is
						aimed for anyone , either a gardner, a food lover, a blogger , a
						professional, event organizers or beauty gurus.{" "}
					</p>

					<p>
						Loka started as an idea for creating a library of regional produce
						in the area of Brandenburg, Berlin. Our aim was to give to the
						consumer a informative platform to know when to plant or eat what is
						in season. Our App later evolved to a create a platform like a
						collaborative a community library that could offer many
						topics around planting eating and learning. In Loka is where the
						consumer shares and asks for help on is own journey either planting
						in the balkony, or posting your recipes, or DIY products related to
						beauty, gardening, arts and crafts, events, etc...{" "}
					</p>
				</section>
			</section>

			<section className="about_video">
				<video src={promoVideo} controls loop></video>
			</section>

			<Footer className="footer" />
		</section>
	);
}
