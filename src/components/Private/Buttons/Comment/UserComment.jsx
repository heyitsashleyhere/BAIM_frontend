import React, { useContext, useState } from 'react'
import { PostsContext } from '../../../../contexts/PostContext'
import { PostCommentsAvatar } from '../../Avatars-Links/Avatars'



// Here write the logic and fetch for every button.
// this component is used in all posts. 
export const UserComment = (props) => {

const{upgrade, setUpgrade}=useContext(PostsContext)

// user is the userLogin ID
const { data , user } = props
const [ error, setError ]=useState()
const [ edit, setEdit]=useState(true)
const [ newComment, setNewComment]=useState('')

const auth = user  === data.author

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
    <section key={data.author}>

       <section className="Comments-inner" key={data.author}>
            <p className="commentDate">{date(data.createdAt)}</p>
            { auth ? 
                <section>  
                { edit  ? <button onClick={e=>setEdit(!edit)}>edit</button> : <button onClick={editComment}>send</button> }
                <button onClick={deleteComment}>delete</button>
                </section>
                :
                null }

            <section className="comment">
                <PostCommentsAvatar id={data._id} name={data.authorProfileName} image={data.authorAvatar}></PostCommentsAvatar>
                { !edit ? <p className="comment-text">{item.message}</p> : <input text={item.message} onChange={e=>setNewComment(e.target.value)}></input> }
            </section>
        </section>

    </section>
    
  )

}