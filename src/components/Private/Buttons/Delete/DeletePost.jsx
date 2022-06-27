import React, { useContext } from 'react'

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
      
      fetch(`http://localhost:7000/${category}/${id}`, config)
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
    <section>
       <button onClick={e => setPreDelete(true)}/>

       {preDelete ? 
        <section>
          <p>are you sure?</p>
          <button onClick={deletePost}>YES</button>
          <button onClick={e=> setPreDelete(false)}>No</button>
        </section>
        : null } 
        
    </section>
    
  )
}
