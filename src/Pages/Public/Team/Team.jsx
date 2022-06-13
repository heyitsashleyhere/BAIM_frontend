import { useRef, useEffect, useContext, useState} from 'react'
import { AnimationContext } from '../../../contexts/AnimationContext'
import team from './teamData.js'

import gsap from 'gsap'

import './team.scss'
import Logo from '../../../assets/logo/raspberry.png' 


const Team = () => {
  const { windowWidth } = useContext(AnimationContext)
  const [isClicked, setIsClicked] = useState(false)
  const [isActive, setIsActive] = useState(false)

  // name/ h2 yposition for gsap name animation
  
  const imagesRef = useRef([]);
  imagesRef.current = [];
  const revealRef = useRef([]);
  revealRef.current = [];
  const nameRef = useRef([]);
  nameRef.current = [];
  
  useEffect(() => {
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
        duration: 1,
        opacity: 1,
        height: '100%',
          ease: 'power2.inOut'
        })
      tl.fromTo(image, {
        duration: 0,
        scale: 1.6,
      }, {
        duration: 1.4,
        scale: 1,
        ease: "power2.inOut",
      })
      tl.to(name, {
        duration: 0.8,
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


  return (
    <section className="team">
        <section className="team_images">
      {team.map((member, index) => {
        return (
          <div className="team_member" key={member.id}>
            <div ref={addToReveal} className="overlay">
              <img ref={addToRefs} src={member.image} alt={`${member.name} image`} className="team_member-img"/>
              <h2 ref={addToNames}><span className="name">{member.name}</span></h2>
            </div>
          </div>
        )}
        )}
        {/* <Member/> */}
      </section>
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
    </section>
  )
}

export default Team


const Member = () => {
  return (
    <>
      <section className="team_logo">
        <p>BIAM TEAM</p>
        <img className="logo" src={Logo}></img>
      </section>
      <section className="team_text team_section">
        <p>We are a group of students doing our final project.
        We all meet in DCI-digital career institute and started this journey together as developers. We come from very different backgrounds. All of us are full stack developers, still with specific roles in this project. We are super happy we came together and were able to finalize our one year program with this project. if your interest click in our fotos tosee our backgrounds.</p>
      </section>
    </>
  )
}