import React, { useState } from "react";
import { Alert, Modal, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import "./addComment.scss";

export const AddComment = ({ post, isModalOpen, setIsModalOpen } ) => {
  const [error, setError] = useState();
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // make a playload with { type: beauty, beauty: _id of the post, message: input}
  function AddComment() {
    const payload = {
      type: post.type,
      [post.type]: post._id,
      message: comment
    }
    console.log('payload', payload)
    const config = {
      method: "POST",
      credentials: "include",
      withCredentials: true, // specify this if you need cookies
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
      body: JSON.stringify(payload),
    };

    fetch(`https://loka-database.herokuapp.com/comments`, config)
      .then((response) => response.json())
      .then((result) => {
        console.log('result :>> ', result);
        if (result.errors) {
          setError(result.errors);
        } else {
          setMessage(result.message)
          setIsModalOpen(true)
          setComment("")
        }
      })
      .catch((error) => console.log(error));
  }

  function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		  }
		  setIsModalOpen(false);
	}

  return (
    <section className="AddComment">
      <textarea
        className="AddComment-input"
        placeholder="leave a comment"
        onChange={(e) => setComment(e.target.value)}
      />

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2}}>{error[0].message}</Alert>
      )}
      
      <button className="NavLink-Black" onClick={AddComment}>
        submit
      </button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<Snackbar open={isModalOpen} autoHideDuration={6000}
						onClose={handleClose}
						message={message}
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
    </section>
  );
};
