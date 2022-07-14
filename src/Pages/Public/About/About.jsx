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
						Loka cares about this, it cares about community and locality as a reply of our concerns about the negative
						side effects of globalization in the last decade.{" "}
					</p>

					<p>
						Our idea comes as an inspiration from Fridays for Future, we are 
						politically Green and our motives are to make life in the cities more
						sustainable wile bringing communities together and to bring
						individuals, local producers and ideas for a cleaner future closer to each other.
					</p>

					<p>
						Loka is an Digital platform that wants to produce a library that is created from the users generating its own communities on topics of sustainability, where users can search, create , share and connect with other users.
						Loka is passionate about gardening, local markets, regional produce food, DIY, events  and mostly important Loka is about to share
						knowledge and inspiration... Loka wants to provide the users this resources:  what how and who is available to you in your region or surroundings, either there are your neighbors, bloggers, professionals, or your virtual friends. Loka moto is Gesunde Globalisierung? dann lokalisiere dich!
						{" "}
					</p>

					<p>
						Loka as a team project started as an idea for creating a library of regional seasonal produce
						in the area of germany. Our aim was to give to the
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
