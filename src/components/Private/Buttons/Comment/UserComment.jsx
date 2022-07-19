import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { PostCommentsAvatar } from "../../Avatars-Links/Avatars";
import { FiEdit2, FiSend } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { Modal, Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./userComment.scss";

// post={item} user={JSON.parse(localStorage.getItem("id"))}
export const UserComment = ({ post }) => {
  const [cookies] = useCookies();
  const [error, setError] = useState();
  const [edit, setEdit] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [snackBarMsg, setSnackBarMsg] = useState(null);
  const [isUserCommentModalOpen, setIsUserCommentModalOpen] = useState(false)
  const [commentData, setCommentData] = useState(post)

  const date = (item) => new Date(item).toLocaleDateString("eu");

  // check user comment id with current user id
  const author = JSON.parse(localStorage.getItem("id")) === post.author;

  useEffect(() => {
    const config = {
      method: "GET",
      credentials: "include",
      withCredentials: true, // specify this if you need cookies
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
    };
    
    fetch(`https://loka-database.herokuapp.com/comments/${post._id}`, config)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          console.log("errors from UserComment GET :>> ", result.errors);
        } else {
          setCommentData(result);
        }
      })
      .catch((error) => console.log('errors from UserComment GET ', error));
  }, [isUserCommentModalOpen])

  function editComment() {
    const payload = {
      type: commentData.type,
      [commentData.type]: commentData[`${commentData.type}`],
      message: newComment === "" ? commentData.message : newComment
    }

    console.log('payload :>> ', payload);
    const config = {
      method: "PATCH",
      credentials: "include",
      withCredentials: true, // specify this if you need cookies
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
      body: JSON.stringify(payload),
    }

    // send id of the comment
    fetch(`https://loka-database.herokuapp.com/comments/${commentData._id}`, config)
      .then((response) => response.json())
      .then((result) => {
        console.log('edit result', result)
        if (result.errors) {
          setError(result.errors);
        } else {
          setSnackBarMsg(result.message)
          setIsUserCommentModalOpen(true)
        }
      })
      .catch((error) => console.log(error));
  }

  function deleteComment() {
    const payload = {
      type: commentData.type,
      [commentData.type]: commentData[`${commentData.type}`],
    }
    const config = {
      method: "DELETE",
      credentials: "include",
      withCredentials: true, // specify this if you need cookies
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
      body: JSON.stringify(payload),
    }
    // send id of the comment
    fetch(`https://loka-database.herokuapp.com/comments/${commentData._id}`, config)
      .then((response) => response.json())
      .then((result) => {
        console.log('delete result', result)
        if (result.errors) {
          setError(result.errors);
        } else {
          setSnackBarMsg(result.message);
          setIsUserCommentModalOpen(true)
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  }

  function handleSnackBarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsUserCommentModalOpen(false)
    setEdit(true)
  }

  return (
    <section className="Comments-inner" key={commentData.author}>
      <section className="comments-header">
        <p className="commentDate">{date(commentData.createdAt)}</p>
        {author ? (
          <section className="comment-editors">
            {edit ? (
              <FiEdit2
                onClick={(e) => setEdit(!edit)}
                className="editor-icon"
              />
            ) : (
              <>
                <FiSend onClick={editComment} className="editor-icon" />{" "}
                <FcCancel
                  onClick={(e) => setEdit(!edit)}
                  className="editor-icon"
                />
              </>
            )}

            <AiOutlineDelete onClick={deleteComment} className="editor-icon" />
          </section>
        ) : null}
      </section>

      <section className="comment">
        <PostCommentsAvatar
          id={commentData._id}
          name={commentData.authorProfileName}
          image={commentData.authorAvatar}
        />
        {edit ? (
          <p className="comment-text">{commentData.message}</p>
        ) : (
          <textarea
            placeholder={commentData.message}
            defaultValue={commentData.message}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
          />
        )}

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>{error.errors}</Alert>
        )}
      </section>

      <Modal open={isUserCommentModalOpen} onClose={() => setIsUserCommentModalOpen(false)}>
        <Snackbar open={isUserCommentModalOpen} autoHideDuration={6000}
          onClose={handleSnackBarClose}
          message={snackBarMsg}
          action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={handleSnackBarClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          } />
      </Modal>
    </section>
  );
};
