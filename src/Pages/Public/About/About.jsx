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


	const promoVideo = `${process.env.PUBLIC_URL}/landingVideos/lokaPromoVideo.webm`

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
				<p>about Loka ...</p>
				<img className="logo" src={Logo}></img>
			</section>

			<section className="about_text">
				<section className="inner_text">
					<p><em>"There is no power for change greater than a community discovering what it cares about."</em> Margaret J. Wheatley</p>

					<p>
						Loka cares about this, it cares about community and locality as a reply to our concerns about the negative side effects of globalization in the last decade.{" "}
					</p>

					<p>
						Our idea comes as an inspiration from Fridays for Future, we are politically Green and our motives are to make life in the cities more sustainable while bringing communities together and to bring individuals, local producers, and ideas for a cleaner future closer to each other.
					</p>

					<p>
						Loka is a Digital platform that wants to produce a library that is created by the users, generating its own communities on topics of sustainability. Users can search, create, share and connect with others. Loka is passionate about gardening, local markets, regional produce, food, DIY, workshops, and events and most important Loka is about sharing knowledge and inspiration... Loka wants to provide the users with these resources: WHAT HOW and WHO is available to you in your region or surroundings, your neighbors, bloggers, professionals, or your virtual friends. Loka motto is "Gesunde Globalisierung? Dann lokalisiere dich!"
						{" "}
					</p>

					<p>
						Loka is a team project started as an idea for creating a library of regional seasonal produce in the area of Germany. Our aim was to give to the consumer an informative platform to know when to plant or eat or what is in season. Our App later evolved to create a platform like a collaborative community library that could offer many topics on learning around planting, eating, and DIY. In Loka is where the consumer shares and asks for help on their own journey either planting on the balcony, posting recipes, or DIY technics related to beauty, gardening, arts and crafts, events, etc...{" "} Our video is inspired by marketing strategy wants to demonstrate the type of clients this app aims for. Get inspired!
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
