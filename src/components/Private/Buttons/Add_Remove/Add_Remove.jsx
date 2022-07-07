import React, { useContext } from 'react'
import {BsPinAngleFill, BsPinAngle} from 'react-icons/bs'
import { PostsContext } from '../../../../contexts/PostContext'

export const Add_Remove = (props) => {
  const{upgrade, setUpgrade}=useContext(PostsContext)

const { category, id }=props
const [error, setError]=useState()

  function AddPost(){
    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "POST",
      };
      
      fetch(`http://localhost:7000/user//${id}`, config)
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
    
    <BsPinAngleFill onClick={AddPost}/>
      
       
    </section>
    
  )
}