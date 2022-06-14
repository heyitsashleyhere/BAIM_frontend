import { useRef, useEffect, useContext, useState} from 'react'
import { AnimationContext } from '../../../contexts/AnimationContext'
import team from './teamData.js'

import gsap from 'gsap'
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail, MdPhoneIphone } from "react-icons/md";

import './team.scss'
import Logo from '../../../assets/logo/raspberry.png' 


const Team = () => {
  const { windowWidth } = useContext(AnimationContext)
  const [isClicked, setIsClicked] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [memberData, setMemberData] = useState(null)

  
  const imagesRef = useRef([]);
  imagesRef.current = [];
  const revealRef = useRef([]);
  revealRef.current = [];
  const nameRef = useRef([]);
  nameRef.current = [];
  
  useEffect(() => {
    // ${name}/ h2 yposition for gsap name animation
    const yPosition = windowWidth >= 768 ? '-100%' : '-25%'

    console.log(imagesRef.current)
    console.log(revealRef.current)
    console.log(nameRef.current)
    console.log(yPosition);

    const tl = gsap.timeline({
      stagger: 0.1,
    })
    revealRef.current.forEach((mask, index) => {
      
      const image = imagesRef.current[index];
      const name = nameRef.current[index];
      
      tl.fromTo(mask, {
        duration: 0,
        opacity: 0,
        height: 0
      }, {
        duration: 0.8,
        opacity: 1,
        height: '100%',
          ease: 'power2.inOut'
        })
      tl.fromTo(image, {
        duration: 0,
        scale: 1.6,
      }, {
        duration: 0.8,
        scale: 1,
        ease: "power2.inOut",
      })
      tl.to(name, {
        duration: 0.6,
        y: yPosition,
        ease: "power2.inOut",
      })
    })

  }, [ windowWidth ])

  const addToRefs = (el) => {
    imagesRef.current.push(el);
  }
  const addToReveal = (el) => {
    revealRef.current.push(el);
  }
  const addToNames = (el) => {
    nameRef.current.push(el);
  }

  const handleMemberComponent = (data) => {
    console.log(data);
    setMemberData(data);
    setIsClicked(!isClicked);
  }
  console.log(memberData, isClicked);



  return (
    <section className="team">
        <section className="team_images">
        {team.map((member, index) => {
        return (
          <div className="team_member" key={member.id}>
            <div ref={addToReveal} className="overlay">
              <img
                ref={addToRefs}
                src={member.image}
                alt={`${member.name.split(' ')[0]} image`}
                onClick={() => handleMemberComponent(member)}
                className="team_member-img" />
              <h2 ref={addToNames}><span className="name">{member.name.split(' ')[0]}</span></h2>
            </div>
          </div>
        )}
        )}
      </section>
      {
        isClicked ? (
          <Member memberData={memberData} />
        ) : ( 
      <>
      <section className="team_logo">
        <p>BIAM TEAM</p>
        <img className="logo" src={Logo}></img>
      </section>
      <section className="team_text team_section">
        <p>We are a group of students doing our final project.
        We all meet in DCI-digital career institute and started this journey together as developers. We come from very different backgrounds. All of us are full stack developers, still with specific roles in this project. We are super happy we came together and were able to finalize our one year program with this project. if your interest click in our fotos tosee our backgrounds.</p>
      </section>
      <section className="team_text team_section">
        <h2>Project Stack</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate inventore dolorem voluptatum recusandae eligendi sed.</p>
      </section>
      <section className="team_text team_section">
        <h2>Figma Project</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate inventore dolorem voluptatum recusandae eligendi sed.</p>
      </section>
      <section className="team_text team_section">
        <h2>Backend Repository</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate inventore dolorem voluptatum recusandae eligendi sed.</p>
      </section>
      <section className="team_text team_section">
        <h2>Frontend Repository</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate inventore dolorem voluptatum recusandae eligendi sed.</p>
              </section>
      </>
    )}
    </section>
  )
}

export default Team


const Member = ({ 
  memberData
 }) => {
  console.log('memberData :>> ', memberData);
  console.log(memberData.social.github);
 

  return (
    <>
      <section className="team_logo member_details">
        <p>{memberData.name}</p>
        <img className="logo" src={Logo}></img>
      </section>
      <section className="team_section member_details-bio">
        <h2>About {memberData.name.split(' ')[0]}</h2>
        <p>{memberData.bio}</p>
      </section>
      <section className="team_section member_details-role">
        <h2>Project Role</h2>
        <p>{memberData.role}</p>
      </section>
      <section className="team_section member_details-contact">
        <h2>Contact</h2>
        <span className="contact">
          <span className="contact_email icon"><MdAlternateEmail className="icon"/><p>{memberData.contact.email}</p></span>
          <span className="contact_phone icon">
            <MdPhoneIphone  className="icon"/>
          <p>{memberData.contact.phone}</p></span>
        </span>

      </section>
      <section className="team_section member_details-social">
        <h2>Connect </h2>
        <span className="social_links">
          <p><a href={memberData.social.github} target="_blank" rel="noopener noreferrer" ><FaGithub /></a></p>
          <p><a href={memberData.social.linkedin} target="_blank" rel="noopener noreferrer" ><FaLinkedin /></a></p>
          <p><a href={memberData.social.github} target="_blank" rel="noopener noreferrer" ><FaTwitter /></a></p>
        </span>
      </section>
    </>
  )
}