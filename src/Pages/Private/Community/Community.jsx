import React, { useContext } from 'react'
import { RoundAvatar } from '../../../components/Private/Avatars-Links/Avatars.jsx'
import { PostsContext } from '../../../contexts/PostContext.js'

import  './community.scss'

export const Community = () => {

 const { users }=useContext(PostsContext)

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
      {users.map(item =><RoundAvatar id={item._id} image={item.avatar} name={item.profileName} key={'community-users-roundAvatar'+ item._id} />)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Gardners</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><RoundAvatar id={item._id} image={item.avatar} name={item.profileName} key={'community-gardeners-roundAvatar'+ item._id}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Farmers</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><RoundAvatar id={item._id} image={item.avatar} name={item.profileName} key={'community-farmers-roundAvatar'+ item._id}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>sellers</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><RoundAvatar id={item._id} image={item.avatar} name={item.profileName} key={'community-sellers-roundAvatar'+ item._id}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>bloggers</h2>
        <p>{users.length} users</p>
      </section>
      <section className="Library-container">
      {users.map(item =><RoundAvatar id={item._id} image={item.avatar} name={item.profileName} key={'community-bloggers-roundAvatar'+ item._id}/>)}
    </section>
    </section>

    <section>
    </section>
   
</section>
    
   
  )
}
