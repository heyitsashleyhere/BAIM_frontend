import React, { useContext } from 'react'
import {AiOutlineDelete} from 'react-icons'
import { PostsContext } from '../../../../contexts/PostContext'

export const AddPost = (props) => {
  const{upgrade, setUpgrade}=useContext(PostsContext)

const { category, id }=props
const [error, setError]=useState()

  function FollowUser(){
    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "POST",
      };
      
      fetch(`http://localhost:7000/user/follow/${id}`, config)
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
    <section>
       <button onClick={FollowUser}>follow</button>
       <p>{error}</p>
    </section>
    
  )
}