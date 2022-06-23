import React, { useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../../../contexts/PostContext'
import './profile.scss'

export const Profile = () => {

 const { users, setUsers }=useContext(PostsContext)
 console.log(users)

 const [ showLibrary, setShowLibrary]=useState(showLibrary)

 const { profileName } =useParams()
 
 const user = users.find(item => item.profileName === profileName)
 console.log(user)

  return (

    <section className="Profile">

    <section className="Profile-inner">
      <section className="Profile-header">
      <button>...</button>

       <section className="Profile-info">
        <img src={user.avatar}></img>
          <section className="Profile-text">
          <h1>{user.profileName}</h1>
          <p>Gardner</p>
          <p>Im all about plants, and herbs</p>
          <h2>{user.userAddress.city} , {user.userAddress.country}</h2>
        </section>
      </section>
      </section>

      <section className='Profile-Library'>
        <p>Library</p>
        <section>
          {user.beauty ? <button onclick={e => }></button> : null}
          {user.garden ? <button></button> : null}
          {user.recipe ? <button></button>: null }
          {user.artsCraft ? <button></button> : null}
        </section>
      </section>
    </section>

    </section>
  )
}
