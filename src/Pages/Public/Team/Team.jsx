import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
// Icons
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { SiSitepoint } from "react-icons/si"
import { GrInstagram } from "react-icons/gr"
import {
	MdAlternateEmail,
	MdOutlineArrowBackIosNew,
} from "react-icons/md";

	<p>
						<a
							href={memberData.social.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTwitter />
						</a>
					</p>
// Components
import team from "./teamData.js";
// Styles and images
import "./team.scss";
import Logo from "../../../assets/logo/raspberry.png";

const Team = () => {
	const [isClicked, setIsClicked] = useState(false);
	const [memberData, setMemberData] = useState(null);
	const [selectedImg, setSelectedImg] = useState(null);

	const imagesRef = useRef([]);
	imagesRef.current = [];
	const revealRef = useRef([]);
	revealRef.current = [];
	const nameRef = useRef([]);
	nameRef.current = [];

	useEffect(() => {

		revealRef.current.forEach((mask, index) => {
			const tl = gsap.timeline();
			const image = imagesRef.current[index];
			const name = nameRef.current[index];

			tl.fromTo(
				mask,
				{
					duration: 0,
					opacity: 0,
					height: 0,
				},
				{
					duration: 0.8,
					opacity: 1,
					height: "100%",
					ease: "power2.inOut",
				}
			);
			tl.fromTo(
				image,
				{
					duration: 0,
					scale: 1.6,
				},
				{
					duration: 0.8,
					scale: 1,
					ease: "power2.inOut",
				}
			);
			tl.to(name, {
				duration: 0.6,
				y: "-100%",
				ease: "power2.inOut",
			});
		});
	}, []);

	const addToRefs = (el) => {
		imagesRef.current.push(el);
	};
	const addToReveal = (el) => {
		revealRef.current.push(el);
	};
	const addToNames = (el) => {
		nameRef.current.push(el);
	};

	const handleMemberComponent = (data, index) => {
		setMemberData(data);
		setIsClicked(true);
		setSelectedImg(index)
	};

	return (
		<>
			<section className="team">
				<section className="team_images">
					{team.map((member, index) => {
						return (
							<div className="team_member" key={member.id}>
								<div ref={addToReveal} className="overlay">
									<img
										ref={addToRefs}
										onClick={() => handleMemberComponent(member, index)}
										key={index}
										src={member.image}
										alt={`${member.name.split(" ")[0]} image`}
										className={`member-img  ${isClicked && selectedImg === index ? 'active' : ''}`}
									/>

									<h2 ref={addToNames}>
										<span className="name">{member.name.split(" ")[0]}</span>
									</h2>
								</div>
							</div>
						);
					})}
				</section>
				{isClicked ? (
					<>
						<section className="back" onClick={() => setIsClicked(false)}>
							<MdOutlineArrowBackIosNew />
							<p>go back</p>
						</section>
						<Member memberData={memberData} />
					</>
				) : (
					<>
						<section className="team_logo">
							<p>BIAM TEAM</p>
							<img className="logo" src={Logo}></img>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<p>
									We are a group of students doing our final project. We all
									meet in DCI-digital career institute and started this journey
									together as developers. We come from very different
									backgrounds. All of us are full stack developers, still with
									specific roles in this project. We are super happy we came
									together and were able to finalize our one year program with
									this project. if your interest click in our fotos tosee our
									backgrounds.
								</p>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Project Stack</h2>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Cupiditate inventore dolorem voluptatum recusandae eligendi
									sed.
								</p>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Figma Project</h2>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Cupiditate inventore dolorem voluptatum recusandae eligendi
									sed.
								</p>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Backend Repository</h2>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Cupiditate inventore dolorem voluptatum recusandae eligendi
									sed.
								</p>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Frontend Repository</h2>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Cupiditate inventore dolorem voluptatum recusandae eligendi
									sed.
								</p>
							</span>
						</section>
					</>
				)}
			</section>
			{/* <ScrollToTop /> */}
		</>
	);
};

export default Team;

const Member = ({ memberData }) => {
	return (
		<>
			<section className="team_logo member_details">
				<p>{memberData.name}</p>
				<img className="logo" src={Logo}></img>
			</section>
			<section className="team_section member_details-bio">
				<h2>About {memberData.name.split(" ")[0]}</h2>
				{memberData.bio}
			</section>
			<section className="team_section member_details-role">
				<h2>Project Role</h2>
				<p>{memberData.role}</p>
			</section>
			<section className="team_section member_details-contact">
				<h2>Contact</h2>
				<span className="contact">
					<span className="contact_email icon">
						<MdAlternateEmail className="icon" />
						<p>{memberData.contact.email}</p>
					</span>
				</span>
			</section>
			<section className="team_section member_details-social">
				<h2>Connect </h2>
				<span className="social_links">
					<p>
						<a
							href={memberData.social.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTwitter />
						</a>
					</p>
					<p>
						<a
							href={memberData.social.github}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaGithub />
						</a>
					</p>
					<p>
						<a
							href={memberData.social.linkedin}
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedin />
						</a>
					</p>
					{memberData.social.facebook && (
						<p>
							<a href={memberData.social.facebook}
							   target="_blank"
							   rel="noopener noreferrer"
							 >
								<FaFacebook />
							</a>
						</p>
					)}
					{memberData.social.instagram && (
						<p>
							<a href={memberData.social.instagram}
							   target="_blank"
							   rel="noopener noreferrer"
							 >
								<GrInstagram />
							</a>
						</p>
					)}
					{memberData.social.twitter && (
						<p>
							<a href={memberData.social.twitter}
							   target="_blank"
							   rel="noopener noreferrer"
							 >
								<FaTwitter />
							</a>
						</p>
					)}
					{memberData.social.portfolio && (
						<p>
							<a href={memberData.social.portfolio}
							   target="_blank"
							   rel="noopener noreferrer"
							 >
								<SiSitepoint />
							</a>
						</p>
					)}
				</span>
			</section>
		</>
	);
};
