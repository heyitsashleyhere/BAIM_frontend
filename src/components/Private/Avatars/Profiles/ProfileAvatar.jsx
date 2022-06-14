
import React from 'react'
import {Link} from 'react-router-dom'



export const ProfileAvatar = ({id, profileName, avatar}) => {


  return (
    <Link to={id} key={id}> 
    <img src={profile}></img>
         <p>{profileName}</p>
    </Link>
    
  )
}
