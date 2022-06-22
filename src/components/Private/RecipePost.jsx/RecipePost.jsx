import React , { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../../../contexts/PostContext'
import { CommentsAvatar, HeaderAvatar, ProfileAvatar } from '../Avatars-Links/Avatars'

import './recipePost.scss'


export const RecipePost = ({category}) => {

 const {recipes, setRecipes}=useContext(PostsContext)


        const { title } = useParams()

        const selected = recipes.find(item=>item.title === title )
        console.log(selected)

        // array of avatars for related recipes
        const matchRecipes= recipes.filter(item => item.tags === selected.tags)
        console.log(matchRecipes)
    
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
        <HeaderAvatar name={selected.authorProfileName} image={selected.authorAvatar}></HeaderAvatar>
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
      {selected.comments ? selected.comments.map(item => <section className="Comments-inner" key={item.author}>
      <p className="commentDate">{date(item.createdAt)}</p>
      <section className="comment">
      <CommentsAvatar name={item.authorProfileName} image={item.authorAvatar}></CommentsAvatar>
      <p className="comment-text">{item.message}</p>
      </section>
      
     
      </section>) : null }
      <section className="Leave-Comment">
        <textarea placeholder='leave a comment'></textarea>
        <button>leave a comment</button>
      </section>

      </section>

      </section> 
  
    </section>
   
  )
}
