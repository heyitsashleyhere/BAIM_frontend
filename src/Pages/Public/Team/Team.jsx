import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import './team.scss'
import team from './teamData.js'

import Logo from '../../../assets/logo/raspberry.png' 




const Team = () => {
  return (
    <section className="team">
        <section className="team_images">
      {team.map(({ id, name, role, title, bio, contact, social, image }) => {
        console.log(id, name, role, title, bio, contact, social, image);
        return (
              <div className="team_member" key={id}>
                <div className={`image`} style={{ backgroundImage: `url(${image})` }}>
                  <span className="name">
                    <h2>{name}</h2>
                  </span>
                </div>
              </div>
        )}
        )}
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

