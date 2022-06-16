import React from 'react'
import { ProfileAvatar } from '../../../components/Private/Avatars-Links/Avatars.jsx'

import users from '../../../Pages/Public/Team/teamData.js'
import  './community.scss'

export const Community = () => {
  return (
    <section className="Pages">
    <section className="Hero">
        <section className="hero-image community"></section>
        <section className="Hero-text">
            <h1>Community</h1>
            <p>Connect</p>
        </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>users </h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><ProfileAvatar id={item.id} image={item.image} name={item.name}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Gardners</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><ProfileAvatar id={item.id} image={item.image} name={item.name}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Agricultures</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><ProfileAvatar id={item.id} image={item.image} name={item.name}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>sellers</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><ProfileAvatar id={item.id} image={item.image} name={item.name}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>bloggers</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><ProfileAvatar id={item.id} image={item.image} name={item.name}/>)}
    </section>
    </section>

    <section>
    </section>
   
</section>
    
   
  )
}
