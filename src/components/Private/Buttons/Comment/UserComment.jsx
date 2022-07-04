import React, { useContext, useState } from 'react'
import { PostsContext } from '../../../../contexts/PostContext'
import { PostCommentsAvatar } from '../../Avatars-Links/Avatars'
import { FiEdit2,FiSend } from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import {FcCancel} from 'react-icons/fc'


// Here write the logic and fetch for every button.
// this component is used in all posts. 
export const UserComment = (props) => {

const{upgrade, setUpgrade}=useContext(PostsContext)

// user is the userLogin ID
const { data , user } = props
const [ error, setError ]=useState()
const [ edit, setEdit]=useState(true)
const [ newComment, setNewComment]=useState('')

 
const date = item => new Date(item).toLocaleDateString("eu")



const author = user  === data.author
console.log('comments', user)

  function editComment(){

    const payload={ comment: newComment }

    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "PATCH",
        body:JSON.stringify(payload)
      };
      
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
       <section className="Comments-inner" key={data.author}>
       <section className="comments-header">
            <p className="commentDate">{date(data.createdAt)}</p>
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
                <PostCommentsAvatar id={data._id} name={data.authorProfileName} image={data.authorAvatar}/>
                { edit ? <p className="comment-text">{data.message}</p> 
                : 
                <input  placeholder={data.message} onChange={e=>setNewComment(e.target.value)}></input> }
            </section>
        </section>

    
  )

}