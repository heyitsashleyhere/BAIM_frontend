import React, { useContext, useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import { BsPinAngleFill, BsPinAngle } from 'react-icons/bs'
import { AnimationContext } from '../../../../contexts/AnimationContext.js';
import { PostsContext } from '../../../../contexts/PostContext.js'
import { Snackbar } from '../../Snackbar.jsx';

export const Pin = (props) => {
const { post }= props
const [cookies] = useCookies(); //loggedIn User info
const { upgrade, setUpgrade, users } = useContext(PostsContext)
const { setSnackbar } = useContext(AnimationContext)
const [ isPinned, setIsPinned ] = useState(false)

useEffect(() => {
  if(post.likes.find(item => item === cookies.id)){
    setIsPinned(true)
  }
}, [post])

  function PinPost(){
		  const config = {
			  method: "PATCH",
			  credentials: "include", // specify this if you need cookies
			  headers: { "Content-Type": "application/json" },
		  };
      
      fetch(`http://localhost:7000/${post.type}/pin/${post._id}`, config)
        .then((response) => response.json())
        .then((result) => {
          console.log('result from fetch', result)
          setSnackbar({
            message: `You have ${isPinned ? 'unpinned' : 'pinned'} the post`,
            open: true,
            severity: 'error'
          })
          setUpgrade(!upgrade)
      })
      .catch((error) => console.log('error from Pin component ', error));

  }


  return (
    <section>
      {post.author === cookies.id ? null :
        post.likes && (
          <>{isPinned ?
            <BsPinAngleFill onClick={PinPost} className="Pin-icon" />
            :
            <BsPinAngle onClick={PinPost} className="Pin-icon" />} </>
        )
      }
      <Snackbar />
    </section>

  )
}