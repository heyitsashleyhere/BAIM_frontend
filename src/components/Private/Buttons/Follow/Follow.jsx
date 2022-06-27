import React, { useContext, useState } from 'react'
import { PostsContext } from '../../../../contexts/PostContext'

export const Follow = (props) => {

  const{ upgrade, setUpgrade }=useContext(PostsContext)

  // user is user._id, users is
  const {user, users}= props

  const author = user === users
  console.log("follow", author)

  const [error, setError]=useState()


  // Check fetch and router
  function FollowUser(){

    const payload ={ type:"follow", id:users}

    const config = {
        credentials: 'include', // specify this if you need cookies
        headers:{"Content-Type":"application/json"},
        method: "DELETE",
        body:JSON.stringify(payload)
        
      };
      
      fetch(`http://localhost:7000/user/collection/${user}`, config)
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
       {!author ? <button onClick={FollowUser}>Follow</button> : null}
       <p>{error}</p>
    </section>
    
  )
}