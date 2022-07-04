import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../../../../contexts/PostContext.js'

export const Follow = () => {
  const { upgrade, setUpgrade, users }=useContext(PostsContext)
  const { profileName } = useParams()
  const [ error, setError ] = useState(null)

  // we can use the localStorage data to check author
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const isAuthor = currentUser.profileName === profileName
  const author = users.find(user => user.profileName === profileName)




  function FollowUser(){

    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    }
       
    fetch(`http://localhost:7000/user/${author._id}/following`, config)
      .then((response) => response.json())
      .then((result) => {
             if(result.errors){
                    setError(result.errors)
             }
             setUpgrade(!upgrade)
      })
      .catch((error) => console.log(`error from Follow request`, error));
    }

  return (
    <section>
       {!isAuthor ? <button onClick={FollowUser}>Follow</button> : null}
       <p>{error}</p>
    </section>
    
  )
}