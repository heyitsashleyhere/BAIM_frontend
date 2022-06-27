import React, { useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import { ProfileCollection } from '../../../components/Private/Avatars-Links/Avatars.jsx'
import { ProfilePost } from './ProfilePost'
import { PostsContext } from '../../../contexts/PostContext'


import './profile.scss';
import { UserContext } from '../../../contexts/UserContext.js'


export const Profile = () => {

 const { users, setUsers, recipes, beauties, artsCrafts, gardens, events  }=useContext(PostsContext)
 const {user}= useContext(UserContext)
 console.log(users)

 const { profileName } =useParams()
 
 const userProfile = users.find(item => item.profileName === profileName)
 console.log(user)


 const [ libBeauty, setLibBeauty]=useState(false)
 const [ libGarden, setLibGarden]=useState(false)
 const [ libRecipe, setLibRecipe]=useState(false)
 const [ libArt, setLibArt]=useState(false)

 const [userLibrary, setUserLibrary]=useState({
   artsCraft:artsCrafts.filter((item,i)=> item._id === user.artsCraft[i]), 
   beauty: beauties.filter((item,i)=> item._id === user.beauty[i]), 
   recipe:recipes.filter((item, i)=> item._id === user.recipe[i]), 
   garden:gardens.filter((item, i)=>item._id === user.garden[i]),
   event: events.filter((item, i)=>item._id === user.event[i]),
  })


  function openPost(id, category){

    const post = (userLibrary[category]).find(post => post._id === id)
    console.log(`post from Profile`, post)

  }





  return (

    <section className="Profile">

    <section className="Profile-inner">
      <section className="Profile-header">
      <button>...</button>

       <section className="Profile-info">
        <img src={userProfile.avatar}></img>
          <section className="Profile-text">
          <h1>{userProfile.profileName}</h1>
          <p>Gardner</p>
          <p>Im all about plants, and herbs</p>
          <h2>{userProfile.userAddress.city} , {userProfile.userAddress.country}</h2>
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
          {userProfile.beauty.length > 0 ? <button onClick={e =>setLibBeauty(!libBeauty)}>beauty</button> : null }
          {userProfile.garden.length > 0 ? <button onClick={e=>setLibGarden(!libGarden)}>garden</button> : null }
          {userProfile.recipe.length > 0 ? <button onClick={e=>setLibRecipe(!libRecipe)}>recipe</button>: null }
          {userProfile.artsCraft.length > 0 ? <button onClick={e=>setLibArt(!libArt)}>arts & crafts</button> : null }
        </section>
        <section>

      
        { libGarden ? userLibrary.gardens.map(item => <ProfileCollection  category={item.category} image={item.image} name={item.title}></ProfileCollection>) : null }
        { libBeauty ? userLibrary.beauty.map(item => <ProfileCollection category={item.category} image={item.image} name={item.title}></ProfileCollection>) : null }
        { libRecipe ? userLibrary.recipes.map(item => <ProfileCollection category={item.category} image={item.image} name={item.title}></ProfileCollection>) : null }
        { libArt ? userLibrary.arts.map(item => <ProfileCollection category={item.category} image={item.image} name={item.title}></ProfileCollection>) : null }  

        {/* <ProfilePost data={userLibrary} id={user._id}/> */}

        </section>
      </section>
    </section>

    </section>
  )
}
