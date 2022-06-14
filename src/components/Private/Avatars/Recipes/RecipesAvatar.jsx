
import { Link } from 'react-router-dom'


import React from 'react'



export const RecipesAvatar = ({id, image, name}) => {
  return (

      <Link key={id}>
        <img src={image}></img>
        <p>{name}</p>
      </Link>
  )
}
