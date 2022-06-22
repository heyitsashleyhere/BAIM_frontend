import React from 'react'
import { Link } from 'react-router-dom'
import './avatars.scss'




export const SeasonalAvatar = ({id, image, profileName}) => {
    return (
      <Link to={`discover/seasonal/${profileName}`} key={id} className="RoundAvatar">
        <section className="imageAvatar">
          <img src={image}></img>
        </section> 
        <h2>{profileName}</h2>
      </Link>
    )
  }

  export const RecipesAvatar = ({id, image, title, path}) => {
    return (
        <Link key={id} to={`${path}`} className="SquareAvatar">
             <section className="imageAvatar">
                <img src={image}></img>
                <h2>{title}</h2>
              </section> 
              
              
        </Link>
    )
  }

  export const ProfileAvatar = ({id, name, image}) => {

    // avatar // profileName
    return (
      <Link to={`${name}`} key={id} className="RoundAvatar"> 
         <section className="imageAvatar">
              <img src={image}></img>           
         </section>
              <h2>{name}</h2> 
      </Link>
      
    )
  }

  export const HeaderAvatar=({id, name, image})=>{

    return (
      <Link to={`/profile/${name}`} key={id} className="HeaderAvatar"> 
      <section className="headAvatar">
           <img src={image}></img>           
      </section>
           <h2>{name}</h2> 
   </Link>
    )
  }

  export const CommentsAvatar=({id, name, image})=>{

    return (
      <Link to={`/profile/${name}`} key={id} className="CommentAvatar"> 
      <section className="comAvatar">
           <img src={image}></img>           
      </section>
           <h2>{name}</h2> 
   </Link>
    )
  }




  export const BeautyAvatar = ({id, name, title, image})=>{

    return (
        <Link to={`${name}`} key={id} className="SquareAvatar"> 
          <section className="imageAvatar">
              <img src={image}></img>
              <h2>{title}</h2>
          </section> 
        </Link>
        
      )
  }