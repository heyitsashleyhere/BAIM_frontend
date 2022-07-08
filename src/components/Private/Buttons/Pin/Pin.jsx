import React, { useContext, useState } from 'react'
import {BsPinAngleFill, BsPinAngle} from 'react-icons/bs'
import { PostsContext } from '../../../../contexts/PostContext'

export const Pin = (props) => {

const{upgrade, setUpgrade}=useContext(PostsContext)

const currentUser = JSON.parse(localStorage.getItem("user"));
const {post}= props


// find if the user is the author
const isAuthor = currentUser[post.type].find(item => item === post._id)

// find if the user as a pin of this post
const isPin = currentUser.pin.find(item => item.postId === post._id )

const [error, setError]=useState()


  function PinPost(){


    const config = {
        credentials: 'include', // specify this if you need cookies
        method: "POST",

      };
      
      fetch(`http://localhost:7000/${post.type}/${post._id}/like`, config)
        .then((response) => response.json())
        .then((result) => {
          setUpgrade(!upgrade)
        })
        .catch((error) => console.log('error from Pin component ',error));
        
  }



  return (
    <section>
    { isAuthor ? null : <>{ isPin ? <BsPinAngleFill onClick={PinPost} className="Pin-icon"/> : <BsPinAngle onClick={PinPost} className="Pin-icon"/>} </> }
    </section>
    
  )
}