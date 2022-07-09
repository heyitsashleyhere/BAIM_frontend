import React, { useContext, useState } from 'react'
import { PostsContext } from '../../../../contexts/PostContext'

import './addComment.scss';

export const AddComment = (props) => {

const{upgrade, setUpgrade}=useContext(PostsContext)

const { post }=props

const [error, setError]=useState()
const [ comment, setComment]=useState('')

// make a playload with { type: beauty, beauty: _id of the post, message: input}
  function AddComment(){

    const payload={ type: post.type, [post.type]: post._id, message:comment }
    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "POST",
        body:JSON.stringify(payload)
      };
      
      fetch(`http://localhost:7000/comments`, config)
        .then((response) => response.json())
        .then((result) => {
          if(result.errors){
            setError(result.errors)
          }
          setUpgrade(!upgrade)
        })
        .catch((error) => console.log(error));
      }

  return (
    <section className="AddComment">
       <textarea className="AddComment-input" placeholder="leave a comment" onChange={e => setComment(e.target.value)}></textarea>
       <button className="NavLink-Black" onClick={AddComment}>submit</button>
       <p>{error}</p>
    </section>
    
  )
}