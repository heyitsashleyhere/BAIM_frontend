import React, { useContext } from 'react'
import { useInRouterContext, useParams } from 'react-router-dom'
import { UserContext } from '../../../contexts/UserContext'
import { PostCommentsAvatar, PostHeaderAvatar } from '../Avatars-Links/Avatars'
import { UserComment } from '../Buttons/Comment/UserComment'

import './postPage.scss'


export const PostPage = ({data}) => {

        const { user } =useContext(UserContext)

        const { title } = useParams()

        const selected = data.find(item=>item.title === title )
  

        // array of avatars for related recipes
        // const match = [category].filter(item => item.tags === selected.tags)
        // console.log(match)
    
        const date= item =>{
          return new Date(item).toLocaleDateString("eu")
        }
        
       


  return (
    <section className="Post-Page" key={selected._id}>
    <section className="Post-Page-Inner">
    <section className="Post-Page-header">
    <button>add</button>
      <button>back</button>
    </section>
      <section className="Post-hero">
        <img src={selected.image}></img>
        <h1>{selected.title}</h1>
      </section>

      <section className="Post-header">
        <PostHeaderAvatar name={selected.authorProfileName} image={selected.authorAvatar}></PostHeaderAvatar>
        <button className="Like-button">{selected.likes.length} Likes</button>
      </section>
       
        <section className="Post-title">
          <p>{selected.category.map(item => item.toUpperCase())}</p>
          <p className="Post-date">{date(selected.createdAt)}</p>
        </section>
        
     
        <section className="Post-description">
          {selected.description.split(/\r?\n/).map(item=> <p>{item}</p>)}
        </section>
        <section className='Post-tags'>
          {selected.tags.map(item => <p>{item}</p>)}
        </section>
      

      <section className="Post-comments">
      <p>Comments</p>
      {selected.comments ? selected.comments.map(item => <UserComment data={item} user={user._id}/>) : null }
      <section className="Leave-Comment">
        <textarea placeholder='leave a comment'></textarea>
        <button>leave a comment</button>
      </section>

      </section>

      </section> 
  
    </section>
   
  )
}
