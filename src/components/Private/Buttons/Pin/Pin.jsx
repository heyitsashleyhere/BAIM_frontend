import React, { useContext, useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import { BsPinAngleFill, BsPinAngle } from 'react-icons/bs'
import { PostsContext } from '../../../../contexts/PostContext.js'
import { Modal, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Pin = (props) => {
const { post }= props
const [ cookies ] = useCookies(); //loggedIn User info
const { postData, setPostData } = useContext(PostsContext)
const [ isModalOpen, setIsModalOpen ] = useState(false);

useEffect(() => {
  const config = {
    method: "GET",
    credentials: "include", // specify this if you need cookies
    headers: { "Content-Type": "application/json" },
  };
  
  fetch(`http://localhost:7000/${post.type}/${post._id}`, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.errors) {
        console.log("errors from Pin GET post :>> ", result.errors);
      } else {
        setPostData(result);
      }
  })
  .catch((error) => console.log('error from Pin component ', error));
}, [post, isModalOpen])

  function PinPost(){
		  const config = {
			  method: "PATCH",
			  credentials: "include", // specify this if you need cookies
			  headers: { "Content-Type": "application/json" },
		  };
      
      fetch(`http://localhost:7000/${post.type}/pin/${post._id}`, config)
        .then((response) => response.json())
        .then((result) => {
          if (result.errors) {
            setError(result.errors);
          } else {
            setIsModalOpen(true);
          }
      })
      .catch((error) => console.log('error from Pin component ', error));
  }

  function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		  }
		  setIsModalOpen(false);
	}

  return (
    <section>
      { postData && (
          postData.author !== cookies.id && (
            post.likes.find(item => item === cookies.id) ? <BsPinAngleFill onClick={PinPost} className="Pin-icon" />
                :
                <BsPinAngle onClick={PinPost} className="Pin-icon" /> 
          )
        )
      }

      {postData && (
				<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<Snackbar open={isModalOpen} autoHideDuration={6000}
						onClose={handleClose}
						message={`You have ${postData.likes.find(item => item === cookies.id) ? `pinned` : `unpinned`} the post`}
						action={
								<React.Fragment>
									<IconButton
									aria-label="close"
									color="inherit"
									sx={{ p: 0.5 }}
									onClick={handleClose}
									>
									<CloseIcon />
									</IconButton>
								</React.Fragment>
								} />
				</Modal>
			)}
    </section>

  )
}