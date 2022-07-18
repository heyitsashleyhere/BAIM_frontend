import React, { useContext, useState } from 'react'
import {FcCancel} from 'react-icons/fc'
import {AiOutlineDelete} from 'react-icons/ai'

import './deletePost.scss'


import { PostsContext } from '../../../../contexts/PostContext'

export const DeletePost = (props) => {

  const{upgrade, setUpgrade}=useContext(PostsContext)

const { category, id }=props
const [error, setError]=useState()
const [ preDelete, setPreDelete ]=useState(false)
  function deletePost(){
    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "DELETE",
      };
      
      fetch(`https://cors-anywhere-baim.herokuapp.com/https://loka-database.herokuapp.com/${category}/${id}`, config)
        .then((response) => response.json())
        .then((result) => {
          if(result.errors){
            setError(result.errors)
            
          }
          setUpgrade(!upgrade)
          setPreDelete(false)
        })
        .catch((error) => console.log(error));
      }

  return (
    <section className="DeletePost">
       <AiOutlineDelete onClick={e => setPreDelete(true)} className="delete-icon"/>
       {preDelete ? 
        <section className="deleteMessage">
          <p>are you sure?</p>
          <button onClick={deletePost}>YES</button>
          <button onClick={e=> setPreDelete(false)}>No</button>
        </section>
        : null } 
        
    </section>
    
  )
}
