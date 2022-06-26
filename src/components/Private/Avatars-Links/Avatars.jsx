import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './avatars.scss'

import berry from '../../../assets/logo/raspberry.png'
import { Follow } from '../Buttons/Follow/Follow'
import { UnFollow } from '../Buttons/Unfollow/Unfollow'
import { UserContext } from '../../../contexts/UserContext'
import { PostsContext } from '../../../contexts/PostContext'



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

  // Avatars used specially in community page and general search engines.
  // this avatar uses nested components to fetch
  export const RoundAvatar = ({name, id, image,}) => {

    const{user} = useContext(UserContext)

    const auth = user._id === id
    console.log('auth', auth)

    // needs to be done after collections api is done
    // const found = user.collection.follow.find(item => item === user._id)

    return (
      <section>
          <Link to={`/profile/${name}`} key={id} className="RoundAvatar"> 
         <section className="imageAvatar">
              <img src={image}></img>           
         </section>
              <h2>{name}</h2>
            
                 
      </Link>
       {auth ? <p>hey its me</p> : <p>follow</p>}
      {/* disable bellow comment after collections from backend are operative */}
      {/* { auth ?  <img src={berry}></img> : (found ? <Follow logUser={logUser} user={user._id}/> : <UnFollow logUser={logUser} user={user._id}/>)} */}

      </section>




  
      
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


