import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/src/all";
// Styles
import "./main.scss";
import "../../../../src/app.scss";
// Logo
import Logo from "../../../assets/logo/loka-logo.png";

gsap.registerPlugin(ScrollTrigger);

const promo_section = [
	{
		id: 1,
		class: "main-search",
		header: "Search",
		title: "we keep you informed ",
		text: "At Loka we provide to our users a produce seasonal Api for all seasons. Either you want to plant or to know when is the rigth time to eat the veggies and fruits planted in your country.",
		subtitle: 'In Season Produce',
		list: [
			{
				id: 1,
				name: 'apple',
				src: require('../../../assets/main-images/apple-w-text.png')
			},
			{
				id: 2,
				name: 'asparagus',
				src: require('../../../assets/main-images/asparagus-w-text.png')
			},
			{
				id: 3,
				name: 'basil',
				src: require('../../../assets/main-images/basil-w-text.png')
			},
			{
				id: 4,
				name: 'beetroot',
				src: require('../../../assets/main-images/beetroot-w-text.png')
			},
			{
				id: 5,
				name: 'blackberry',
				src: require('../../../assets/main-images/blackberry-w-text.png')
			},
			{
				id: 6,
				name: 'blueberry',
				src: require('../../../assets/main-images/blueberry-w-text.png')
			},
			{
				id: 7,
				name: 'broccoli',
				src: require('../../../assets/main-images/broccoli-w-text.png')
			},
			{
				id: 8,
				name: 'cabbage',
				src: require('../../../assets/main-images/cabbage-w-text.png')
			},
			{
				id: 9,
				name: 'carrots',
				src: require('../../../assets/main-images/carrots-w-text.png')
			},
			{
				id: 10,
				name: 'strawberry',
				src: require('../../../assets/main-images/strawberry-w-text.png')
			},
			{
				id: 11,
				name: 'celery',
				src: require('../../../assets/main-images/celery-w-text.png')
			},
			{
				id: 12,
				name: 'cucumber',
				src: require('../../../assets/main-images/cucumber-w-text.png')
			},
			{
				id: 13,
				name: 'dill',
				src: require('../../../assets/main-images/dill-w-text.png')
			},
			{
				id: 14,
				name: 'eggplant',
				src: require('../../../assets/main-images/eggplant-w-text.png')
			},
		]
	},
	{
		id: 2,
		class: "main-create",
		header: "CREATE * SHARE * COLLECT * INSPIRE",
		title: "Always with you to inspire and remember",
		text: "Create your collection of recipes, your home-made beauty solutions, save posts of D.I.Y. or how to plant in your balcony... whatever suits you Loka got it !!",
		subtitle: 'Explore',
		list: [
			{
				id: 1,
				src: require('../../../assets/main-images/collection-1.png'),
				name: 'collection-item-1'
			},
			{
				id: 2,
				src: require('../../../assets/main-images/collection-2.png'),
				name: 'collection-item-2'
			},
			{
				id: 3,
				src: require('../../../assets/main-images/collection-3.png'),
				name: 'collection-item-3'
			},
			{
				id: 4,
				src: require('../../../assets/main-images/collection-4.png'),
				name: 'collection-item-4'
			},
			{
				id: 5,
				src: require('../../../assets/main-images/collection-5.png'),
				name: 'collection-item-5'
			},
			{
				id: 6,
				src: require('../../../assets/main-images/collection-6.png'),
				name: 'collection-item-6'
			},
			{
				id: 7,
				src: require('../../../assets/main-images/collection-7.png'),
				name: 'collection-item-7'
			},
			{
				id: 8,
				src: require('../../../assets/main-images/collection-8.png'),
				name: 'collection-item-8'
			},
			{
				id: 9,
				src: require('../../../assets/main-images/collection-9.png'),
				name: 'collection-item-9'
			},
			{
				id: 10,
				src: require('../../../assets/main-images/collection-10.png'),
				name: 'collection-item-10'
			},
			{
				id: 11,
				src: require('../../../assets/main-images/collection-11.png'),
				name: 'collection-item-11'
			},
			{
				id: 12,
				src: require('../../../assets/main-images/collection-12.png'),
				name: 'collection-item-12'
			},
		]
	},
	{
		id: 3,
		class: "main-connect",
		header: "CONNECT",
		image: require('../../../assets/avatars_2-removebg-preview.png'),
		title: "Create your community",
		text: "At Loka you can follow other users, comment on your favorite posts and save all you dont want to forget",
		subtitle: "lets Connect",
		list: [
			{
				id: 1,
				src: require('../../../assets/main-images/user_profile-1.png'),
				name: 'user_profile'
			},
			{
				id: 2,
				src: require('../../../assets/main-images/user_profile-2.png'),
				name: 'user_profile'
			},
			{
				id: 3,
				src: require('../../../assets/main-images/user_profile-4.png'),
				name: 'user_profile'
			},
			{
				id: 4,
				src: require('../../../assets/main-images/user_profile-3.png'),
				name: 'user_profile'
			},
			{
				id: 5,
				src: require('../../../assets/main-images/user_profile-5.png'),
				name: 'user_profile'
			},
			// {
			//   id: 6,
			//   src: require('../../../assets/main-images/user_profile-6.png'),
			//   name: 'user_profile'
			// },
		]
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

	const sectionRef = useRef([])
	sectionRef.current = [];

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		sectionRef.current.forEach((section, i) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: 'top 70%',
					scrub: true,
					toggleActions: 'play none none reset',
				}
			})
			tl.fromTo(section, {
				autoAlpha: 0,
				y: 100,
			}, {
				duration: 1,
				autoAlpha: 1,
				y: 0,
				ease: 'power2.out'
			})
		})
	}, [])


	const addToSectionRef = (el) => {
		sectionRef.current.push(el)
	}


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
				{promo_section.map((item, idx) => (
					<div ref={addToSectionRef} className={`${item.class} section`} key={`section-${idx}`}>
						<div key={`section-header-${idx}`} className={`${item.class}-header section-header`}>
							<h1>{item.header}</h1>
							<h2>{item.title}</h2>
						</div>
						<div className={`${item.class}-cards section-cards`}>
							<h3 key={`subtitle-${idx}`} className={`${item.class}-subtitle subtitle`}>{item.subtitle}</h3>
							<div className={`${item.class}-cards cards-list`}>
								{item.list.map((card, index) => (
									<div key={index} className="card">
										<img src={card.src} alt={card.name} />
									</div>
								))}
							</div>
						</div>
						<div className="section-text">
							{item.text}
						</div>
					</div>
				))}
			</section >
		</section >
	);
};

export default Main;
