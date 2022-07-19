import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
// Icons
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook , FaCookieBite, FaSass } from "react-icons/fa";
import { SiSitepoint, SiGreensock, SiFirebase, SiReact, SiExpress, SiMongodb, SiNodemon, SiFigma, SiGithub, SiMaterialui, SiNodedotjs } from "react-icons/si"
import { GrInstagram } from "react-icons/gr"
import {
	MdAlternateEmail,
	MdOutlineArrowBackIosNew,
} from "react-icons/md";



// Components
import team from "./teamData.js";
// Styles and images
import "./team.scss";
import Logo from "../../../assets/logo/raspberry.png";
import { Link } from "@mui/material";



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
							<p>BAIM TEAM</p>
							<img className="logo" src={Logo}></img>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<p>
									We are a group of colleagues and friends in the one-year program of web development at <a href="https://digitalcareerinstitute.org/" target="_blank">DCI - Digital Career Institute gGmbH</a>. 
									We come from different professional backgrounds and nationalities and together we created Loka as our final project of the program. 
                                    This project showcases all of our studies to become full-stack developers. In this project, we explored different aspects of programming with
                                    specific roles. If you are interested please click on our photos to see our bios.
								</p>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Project Stack</h2>
								<p>
									This is an general overview of our stack for both frontend and backend.
									For more information please scroll down. 
								</p>
								<section className="stack-icons">

									<section className="s_icon">
										<FaSass/>
										<p>Sass</p>
									</section>

									<section className="s_icon">
										<SiGreensock/>
										<p>Greensock Gsap</p>
									</section>
									<section className="s_icon">
										<SiMaterialui/>
										<p>Node JS</p>
									</section>
									<section className="s_icon">
										<SiMongodb/>
										<p>MongoDb</p>
									</section>
									<section className="s_icon">
										<SiExpress/>
										<p>Express</p>
									</section>
									<section className="s_icon">
										<SiFirebase/>
										<p>Firebase</p>
									</section>
									<section className="s_icon">
										<SiNodemon/>
										<p>Nodemon</p>
									</section>
									<section className="s_icon">
										<SiReact/>
										<p>React</p>
									</section>
								
									<section className="s_icon">
										<SiFigma/>
										<p>Figma</p>
									</section>
									<section className="s_icon">
										<SiMaterialui/>
										<p>Material UI</p>
									</section>

									<section className="s_icon">
										<SiGithub/>
										<p>Github</p>
									</section>
									<section className="s_icon">
										<FaCookieBite/>
										<p>Cookies</p>
									</section>

								</section>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Excalidraw Project</h2>
								<p>We started this project using Excalidraw. This was a perfect collaborative tool that helped us sketch an initial understanding of our product. Here we created strategies and relations from the frontend and backend. Are you curious to see more? Please click on the image below.</p>
								<a href="https://excalidraw.com/#room=abb0e7e174f679add6d4,LTObiIulrnaU9LxThYW01w" target="_blank"><img src={require('./../../../assets/team-projects/excalidraw.png')}/></a>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Figma Project</h2>
								<p>We used Figma to design the frontend for all sorts of media queries. The design was built at the same time as the backend. This strategy helped us to have a further understanding of the system we needed to implement in the backend and frontend. Are you curious to see more? Please click on the image below.</p>
								
								<a href="https://www.figma.com/file/ATMhtCX7NRp9otxh0y1EMy/Untitled-(Copy)?node-id=0%3A1" target="_blank"><img src={require('./../../../assets/team-projects/figma.png')}/></a>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Github Project Management</h2>
								<p>
								  Some other project management tools we considered were Trello, Jira and Notion. We finally chose Github as it is very convenient for our team to link issues and push requests.
								  If you would like to see more please click on the image below. 
								</p>
								<a href="https://github.com/users/heyitsashleyhere/projects/2" target="_blank"><img src={require('./../../../assets/team-projects/githubprojects.png')}/></a>
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Backend Repository</h2>
								<p>
									Our backend stack was made with: bcrypt, change, cookie-parser, cors, dotenv, express, express-validator, http-errors, jsonwebtoken, mongoose, nodemon, faker-js.
								</p>
								<p>
									Please click on the icon to see our repository.
								</p>
								<section className="repo"><a href=""><SiGithub/></a></section>
							
							</span>
						</section>
						<section className="team_text team_section">
							<span className="inner_text">
								<h2>Frontend Repository</h2>
								<p>
									Our frontend stack was made with: Sass, Material-Ui, Gsap-Greensock, Firebase, date-fns, React, React-Cookie, React-Dom, React-icons, React-scripts and React-geocode.  
								</p>
								<p>
									Please click on the icon to see our repository.
								</p>
								<section className="repo"><a href=""><SiGithub/></a></section>
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
