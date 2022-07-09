import React, { useContext, useState } from 'react'
import { PostsContext } from '../../../../contexts/PostContext'
import { PostCommentsAvatar } from '../../Avatars-Links/Avatars'
import { FiEdit2,FiSend } from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import {FcCancel} from 'react-icons/fc'

import './userComment.scss'


export const UserComment = (props) => {

const{upgrade, setUpgrade}=useContext(PostsContext)


const { post, user } = props
const [ error, setError ]=useState()
const [ edit, setEdit]=useState(true)
const [ newComment, setNewComment]=useState('')


const date = item => new Date(item).toLocaleDateString("eu")

// check user comment id with current user id
const author = user  === post.author



  function editComment(){

    const payload={ message: newComment }

    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "PATCH",
        body:JSON.stringify(payload)
      };
      // send id of the comment
      fetch(`http://localhost:7000/comment/${user}`, config)
        .then((response) => response.json())
        .then((result) => {
          if(result.errors){
            setError(result.errors)
          }
          setUpgrade(!upgrade)
        })
        .catch((error) => console.log(error));
      }

 function deleteComment(){
    const config = {
        credentials: 'include', // specify this if you need cookies
        headers:{"Content-Type":"application/json"},
        method: "DELETE",
        body:JSON.stringify(payload)
        
      };
      // send id of the comment
      fetch(`http://localhost:7000/user/comment/${user}}`, config)
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
       <section className="Comments-inner" key={post.author}>
       <section className="comments-header">
            <p className="commentDate">{date(post.createdAt)}</p>
            { author ? 
                <section className="comment-editors">  
                { edit  ? <FiEdit2 onClick={e=>setEdit(!edit)}  className="editor-icon"/>  
                : <><FiSend onClick={editComment} className="editor-icon"/> <FcCancel onClick={e =>setEdit(!edit)} className="editor-icon"/></>
                }

                <AiOutlineDelete onClick={deleteComment} className="editor-icon"/>
                </section>
                :
                null }
        </section>

            <section className="comment">
                <PostCommentsAvatar id={post._id} name={post.authorProfileName} image={post.authorAvatar}/>
                { edit ? <p className="comment-text">{post.message}</p> 
                : 
                <textarea  placeholder={post.message} onChange={e=>setNewComment(e.target.value)} className="comment-input"></textarea> }
            </section>
        </section>

    
  )

}