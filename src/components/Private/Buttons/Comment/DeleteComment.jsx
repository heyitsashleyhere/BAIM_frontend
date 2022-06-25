import React, { useContext } from 'react'
import { PostsContext } from '../../../../contexts/PostContext'

export const Comment = (props) => {
  const{upgrade, setUpgrade}=useContext(PostsContext)

const { category, id }=props
const [error, setError]=useState()

  function deleteComment(){
    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "DELETE",
      };
      
      fetch(`http://localhost:7000/comment/${id}`, config)
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
       <button onClick={deleteComment}>remove</button>
       <p>{error}</p>
    </section>
    
  )
}