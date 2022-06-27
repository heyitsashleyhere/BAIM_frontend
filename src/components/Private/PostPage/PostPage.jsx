import React from 'react'
import { useParams } from 'react-router-dom'
import { PostCommentsAvatar, PostHeaderAvatar } from '../Avatars-Links/Avatars'

import './postPage.scss'


// ? IVO : Im still working on the usercomments component the one its here its not to stay.

export const PostPage = ({data}) => {

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
      { selected.comments ? selected.comments.map(item =>(

      <section className="Comments-inner" key={item.author}>
          <p className="commentDate">{date(item.createdAt)}</p>
          <section className="comment">
            <PostCommentsAvatar name={item.authorProfileName} image={item.authorAvatar}></PostCommentsAvatar>
            <p className="comment-text">{item.message}</p>
          </section>
      </section>
      )) 
      : 
      null }

      <section className="Leave-Comment">
        <textarea placeholder='leave a comment'></textarea>
        <button>leave a comment</button>
      </section>

      </section>

      </section> 
  
    </section>
   
  )
}
