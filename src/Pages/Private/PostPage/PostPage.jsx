import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { PostHeaderAvatar } from "../../../components/Private/Avatars-Links/Avatars.jsx";
import { UserComment } from "../../../components/Private/Buttons/Comment/UserComment";
import { MdOutlineArrowBack } from "react-icons/md";
import { Pin } from "../../../components/Private/Buttons/Pin/Pin.jsx";
import { AddComment } from "../../../components/Private/Buttons/Comment/AddComment.jsx";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar.jsx";
import { ProduceNavbar } from "../../../components/Private/section-header/ProduceNavbar.jsx";
import EditPost from "../../../components/Private/Forms/EditPost/EditPost.jsx";
import "./postPage.scss";
import { Button, Modal, Paper, IconButton, Popover, Typography, Box, Snackbar, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const PostPage = ({ data }) => {
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [cookies] = useCookies();
  const { id } = useParams();
  const [isPostEditOpen, setIsPostEditOpen] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);
  const [isUserCommentModalOpen, setIsUserCommentModalOpen] = useState(false)
  const [selected, setSelected] = useState(data.find((item) => item._id === id))
  
  // formate date
  const date = (item) => new Date(item).toLocaleDateString("eu");

  useEffect(() => {
    const config = {
      method: "GET",
      credentials: "include", // specify this if you need cookies
      headers: { "Content-Type": "application/json" },
    };
    
    fetch(`http://localhost:7000/${data[0].type}/${id}`, config)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          console.log("errors from PostPage GET :>> ", result.errors);
        } else {
          setSelected(result);
        }
    })
    .catch((error) => console.log('error from Pin component ', error));
  }, [selected, isAddCommentModalOpen])
  

  const handleDeleteClick = (event) => {
    setDeleteAnchorEl(event.currentTarget);
  };

  const handleDeleteClose = () => {
    setDeleteAnchorEl(null);
  };

  const deleteIsOpen = Boolean(deleteAnchorEl);
  const deleteId = deleteIsOpen ? 'postPage-delete-popover' : undefined;

  function handlePostDelete(id) {
    const config = {
      method: "delete",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:7000/${data[0].type}/${id}`, config)
      .then((response) => response.json())
      .then((result) => {
        if (!result.errors) {
          setIsSnackbarOpen(true)
        } else {
          console.log('delete Post error :>> ', result);
        }
      })
      .catch((error) => console.log(error));
  }

  function handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
			return;
		  }
    setIsSnackbarOpen(false)
    setShowCatPosts(null)
  }

  return (
    <>
      <ProduceNavbar />
      <DiscoverNavbar />
      <section className="Post-Page" key={selected._id}>
        <section className="Post-Page-Inner">
          <section className="Post-hero">
            <section className="Post-Page-header">
             <Pin post={selected}/>
              <MdOutlineArrowBack onClick={() => navigate(-1)} className="Post-Page-Header-icons" />
            </section>
            <img src={selected.image}></img>
            <h1>{selected.title}</h1>
          </section>

          <section className="Post-header">
            <PostHeaderAvatar
              name={selected.authorProfileName}
              image={selected.authorAvatar}
            />
            {cookies.profileName === selected.authorProfileName && (
              <div>
                <IconButton aria-label="delete" color="primary" sx={{ mr: 2 }}
                            onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
                <Popover
                  id={deleteId}
                  open={deleteIsOpen}
                  anchorEl={deleteAnchorEl}
                  onClose={handleDeleteClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    Want to delete this post forever ever?
                  </Typography>
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      sx={{ mb: 1 }}
                      onClick={() => handlePostDelete(selected._id)}
                    >
                      YES
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CloseIcon />}
                      sx={{ mb: 1 }}
                      onClick={() => setDeleteAnchorEl(null)}
                    >
                      NO
                    </Button>
                  </Box>
                </Popover>
                <Button variant="outlined" onClick={() => setIsPostEditOpen(true)}>
                  <EditIcon fontSize="small" sx={{ mr: 2 }} color="primary"/>Edit
                </Button>
              </div>
            )}
          </section>

          <Modal open={isPostEditOpen} onClose={() => { setIsPostEditOpen(false) }}
                sx={{
                  display: 'flex',
                  overflow: 'scroll',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Paper elevation={3} sx={{ width: '80%', height: '90%', overflow: 'scroll' }}>
                  <EditPost postData={selected} setPostData={setSelected} setIsEditOpen={setIsPostEditOpen} />
                </Paper>

          </Modal>

          <Modal open={isSnackbarOpen} onClose={() => { setIsSnackbarOpen(false); setUpgrade(!upgrade) }} >
            <Snackbar open={isSnackbarOpen} autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={"Your post is deleted"}
                    action={
                        <React.Fragment>
                          <IconButton
                          aria-label="close"
                          color="inherit"
                          sx={{ p: 0.5 }}
                          onClick={handleSnackbarClose}
                          >
                          <CloseIcon />
                          </IconButton>
                        </React.Fragment>
                        } />
          </Modal>

          <section className="Post-title">
            <div>
              {selected.category.map((item, i) => 
                <Chip label={item.toUpperCase()} sx={{marginRight: 1}} variant="outlined" key={'category-'+ item + i}/>
              )}
            </div>

            {/* <p>{selected.category.map((item) => item.toUpperCase())}</p> */}
            <p className="Post-date">{date(selected.createdAt)}</p>
          </section>

          <section className="Post-description">
            {selected.description.split(/\r?\n/).map((item, i) => (
              <p key={'PostPage-description' + i}>{item}</p>
            ))}
          </section>
          <section className="Post-tags">
            {selected.tags && selected.tags.map((item) => (
              <p key={'PostPage-tags' + item}>{item}</p>
            ))}
          </section>

          <section className="Post-video">
            {selected.video ? (
              <video src={selected.video} controls width="100%"></video>
            ) : null}
          </section>

          <section className="Post-comments">
            <p>Comments</p>
            {selected.comments
              ? selected.comments.map((item, index) => (
                  <UserComment post={item} key={'userComment' + index} />
                ))
              : null}

            <div className="Leave-Comment">  
              <AddComment post={selected} isModalOpen={isAddCommentModalOpen} setIsModalOpen={setIsAddCommentModalOpen}/>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

{
  /* <section className="Comments-inner" key={item.author}>
          <p className="commentDate">{date(item.createdAt)}</p>
          <section className="comment">
            <PostCommentsAvatar name={item.authorProfileName} image={item.authorAvatar}></PostCommentsAvatar>
            <p className="comment-text">{item.message}</p>
          </section>
      </section> */
}
