
import React from 'react'
import { Link } from 'react-router-dom'

export const AppHeader = () => {

  return (

      <div>
        <Link to="discover"><h1>discover</h1></Link>
        <Link to="feed"><h1>feed</h1></Link>
        <Link to="profile"><h1>profile</h1></Link>
        <Link to="create"><h1>create</h1></Link>
     </div>
    
  )
}

