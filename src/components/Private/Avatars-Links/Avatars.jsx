import React from 'react'
import { Link } from 'react-router-dom'



export const SeasonalAvatar = ({id, profile, profileName}) => {
    return (
      <Link to={id} key={id}> 
      <img src={profile}></img>
           <p>{profileName}</p>
      </Link>
    )
  }

  export const RecipesAvatar = ({id, image, name}) => {
    return (
  
        <Link key={id}>
          <img src={image}></img>
          <p>{name}</p>
        </Link>
    )
  }

  export const ProfileAvatar = ({id, profileName, avatar}) => {

    return (
      <Link to={id} key={id}> 
      <img src={profile}></img>
           <p>{profileName}</p>
      </Link>
      
    )
  }

  export const BeautyAvatar = ({id, profileName, avatar})=>{

    return (
        <Link to={id} key={id}> 
        <img src={profile}></img>
             <p>{profileName}</p>
        </Link>
        
      )
  }