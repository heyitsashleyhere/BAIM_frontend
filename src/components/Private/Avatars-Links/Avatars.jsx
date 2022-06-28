import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './avatars.scss'

import berry from '../../../assets/logo/raspberry.png'
import { Follow } from '../Buttons/Follow/Follow'
import { UnFollow } from '../Buttons/Unfollow/Unfollow'
import { UserContext } from '../../../contexts/UserContext'
import { PostsContext } from '../../../contexts/PostContext'
import { DeletePost } from '../Buttons/Delete/DeletePost'



// general avatars for the App
  export const SquareAvatar = ({id, image, title, path, author, type}) => {
    const {user}=useContext(UserContext)
    const { users}=useContext(PostsContext)
    
    const find = users.find(item => item === user._id)
    const isUser = user._id === author

    // logic to find in user collections the specific item so the add or remove buttons can appear
    // const match = user.collections[type].find(item => item === author) 

    console.log(isUser)

    return (
      <section className="SquareAvatars">
      {isUser ? <section className="Avatar-Buttons"><button>edit</button> <DeletePost /> </section> : null }
        <Link key={id} to={`${path}`} className="InnerSquareAvatar">
             <section className="imageAvatar">
                <img src={image}></img>
                <h2>{title}</h2>
              </section> 
        </Link>
        {isUser ? <section className="Avatar-Buttons"><button>edit</button> <DeletePost /> </section> : null }
        {/* experimental logic for add remove to user collections */}

      </section>
    )
  }

  // Avatars used specially in community page and general search engines.
  // this avatar uses nested components to fetch
  export const RoundAvatar = ({name, id, image,}) => {

    const{user} = useContext(UserContext)

    
    const author = user._id === id
    console.log('auth', author)

    // needs to be done after collections api is done
    // const found = user.collection.follow.find(item => item === user._id)

    return (
      <section className="AvatarR">
          <Link to={`/profile/${name}`} key={id} className="RoundAvatar"> 
         <section className="imageAvatar">
              <img src={image}></img>           
         </section>
              <h2>{name}</h2>
            
                 
      </Link>
       {author ? <p>hey its me</p> : <p>follow</p>}
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


