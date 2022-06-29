import React, { useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { ProfileCollection } from '../../../components/Private/Avatars-Links/Avatars.jsx'
import { ProfilePost } from './ProfilePost'
import { PostsContext } from '../../../contexts/PostContext'


import './profile.scss';
import { Follow } from '../../../components/Private/Buttons/Follow/Follow.jsx'


export const Profile = () => {
 const { postCategories, currentUserLibrary, setCurrentUserLibrary } = useContext(PostsContext)
 const { profileName } = useParams()
 const currentUser = JSON.parse(localStorage.getItem('user'))
//  console.log(currentUser)
 const readablePostCategories = ["beauty", "arts and craft", "garden", "recipe", "event"]
//  const currentUserLibrary = {
//   beauty: [], artsCraft: [], garden: [], recipe: [], event: []
//  }
 

 useEffect(() => {
  const config = {
    method: "GET",
    credentials: 'include', // specify this if you need cookies
    headers: { "Content-Type": "application/json" }
  };
  const promises = postCategories.map(cat => fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config))
  Promise.all(promises)
         .then(responses => Promise.all( responses.map(r => r.json())) )
         .then(result =>  setCurrentUserLibrary(result)) // result.forEach(catArr =>  setCurrentUserLibrary({...currentUserLibrary, [catArr[0].type]: catArr})) //currentUserLibrary[cat[0].type] = cat
         .catch(err => console.error(`from Promise all`, err))

        console.log('currentUserLibrary :>> ', currentUserLibrary);
 }, [])

 
 
  return (
    <section className="Profile">
      <section className="Profile-inner">

        <section className="Profile-header">
          <button>...</button>

          <section className="Profile-info">
            <img src={currentUser.avatar}></img>
            <section className="Profile-text">
              <h1>{currentUser.profileName}</h1>
              <p>Gardner</p>
              <p>I'm all about plants, and herbs</p>
              <h2>
                {currentUser.userAddress.city} ,{" "}
                {currentUser.userAddress.country}
              </h2>
            </section>
          </section>

          <section className="Profile-followers">
            <Follow user={currentUser._id} users={currentUser._id} />
            <p>100 followers</p>
            <p>10 following</p>
          </section>
        </section>

        <section className='Profile-Library'>
          <p>Library</p>
          <section>

          </section>
        
          <section>


          </section>
        </section>

      </section>
    </section>
  )
}

// {console.log('currentUserLibrary from return', Object.values(currentUserLibrary))}
// {Object.entries(currentUserLibrary).map((postCat, i) => (
//   console.log('postCat',postCat)
//   postCat[postCategories[i]].length > 0 && <button>{readablePostCategories[i]}</button>
// ))}
// {
//   postCategories.map((postCat, i) => (
//     console.log('currentUserLibrary[`${postCat}`]', currentUserLibrary[`${postCat}`])
//   ) )
// }