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
