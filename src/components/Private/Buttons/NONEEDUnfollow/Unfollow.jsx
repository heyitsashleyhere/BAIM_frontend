import React, { useContext } from 'react'
import { PostsContext } from '../../../../contexts/PostContext'

export const UnFollow = (props) => {

  const{ upgrade, setUpgrade }=useContext(PostsContext)

  const {logUser, user}= props

  const [error, setError]=useState()


  // Check fetch and router
  function UnFollowUser(){

    const payload ={ type:"follow", id:user}

    const config = {
        credentials: 'include', // specify this if you need cookies
        headers:{"Content-Type":"application/json"},
        method: "DELETE",
        body:JSON.stringify(payload)
        
      };
      
      fetch(`http://localhost:7000/user/collection/${logUser}}`, config)
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
       <button onClick={UnFollowUser}>UnFollow</button>
       <p>{error}</p>
    </section>
    
  )
}