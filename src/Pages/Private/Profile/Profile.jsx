import React, { useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../../../contexts/PostContext'
import './profile.scss'

export const Profile = () => {

 const { users, setUsers, recipes, beauty, arts, gardens }=useContext(PostsContext)
 console.log(users)
 const { profileName } =useParams()
 
 const user = users.find(item => item.profileName === profileName)
 console.log(user)

 const [ libBeauty, setLibBeauty]=useState(false)
 const [ libGarden, setLibGarden]=useState(false)
 const [ libRecipe, setLibRecipe]=useState(false)
 const [ libArt, setLibArt]=useState(false)

 function getAvatar(){}


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

      <section className="Profile-followers">
      <button>follow</button>
      <p>100 followers</p>
      <p>10 following</p>
      </section>

      </section>

      <section className='Profile-Library'>
        <p>Library</p>
        <section>
          {user.beauty.length > 0 ? <button onClick={e =>setBeauty(!libBeauty)}>beauty</button> : null }
          {user.garden.length > 0 ? <button onClick={e=>setGarden(!libGarden)}>garden</button> : null }
          {user.recipe.length > 0 ? <button onClick={e=>setRecipe(!libRecipe)}>recipe</button>: null }
          {user.artsCraft.length > 0 ? <button onClick={e=>setArt(!libArt)}>arts & crafts</button> : null }
        </section>
        <section>

        {/* { beauty ? user.beauty.map(item => item)} */}
        { libGarden ? <button>garden</button> : null }


        </section>
      </section>
    </section>

    </section>
  )
}
