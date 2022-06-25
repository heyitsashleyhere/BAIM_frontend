import React from 'react'
import { Link } from 'react-router-dom'
import './avatars.scss'



// general avatars for the App


  export const SquareAvatar = ({id, image, title, path}) => {
    return (
        <Link key={id} to={`${path}`} className="SquareAvatar">
             <section className="imageAvatar">
                <img src={image}></img>
                <h2>{title}</h2>
              </section> 
        </Link>
    )
  }

  export const RoundAvatar = ({id, name, image}) => {

    return (
      <Link to={`/profile/${name}`} key={id} className="RoundAvatar"> 
         <section className="imageAvatar">
              <img src={image}></img>           
         </section>
              <h2>{name}</h2> 
      </Link>
      
    )
  }


  // AVATARS for POSTS
  export const PostHeaderAvatar=({id, name, image})=>{

    return (
      <Link to={`/profile/${name}`} key={id} className="HeaderAvatar"> 
      <section className="headAvatar">
           <img src={image}></img>           
      </section>
           <h2>{name}</h2> 
   </Link>
    )
  }

  export const PostCommentsAvatar=({id, name, image})=>{

    return (
      <Link to={`/profile/${name}`} key={id} className="CommentAvatar"> 
      <section className="comAvatar">
           <img src={image}></img>           
      </section>
           <h2>{name}</h2> 
   </Link>
    )
  }


  // AVATARS FOR PROFILE PAGE // NEEDS TO BE DONE 

export const ProfileCollection=({category, name, image})=>{

    
    return(
      <section className="SquareAvatar">
        <section className="imageAvatar">
          <img src={image}></img>
          <h2>{name}</h2>
        </section>
      </section>
      )
  }


