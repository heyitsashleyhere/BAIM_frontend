import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./avatars.scss";

import { Modal,	IconButton,	Button,	Typography,	Menu,	MenuItem,	Popover, Box, Paper, Snackbar} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";


import { Follow } from "../Buttons/Follow/Follow.jsx";
import { UserContext } from "../../../contexts/UserContext";
import { PostsContext } from "../../../contexts/PostContext";
import EditPost from "../Forms/EditPost/EditPost.jsx";
import { Pin } from "../Buttons/Pin/Pin";
import defaultImg from "../../../assets/LOKA2.jpg"


// general avatars for the App
export const SquareAvatar = ({ data }) => {
    const [cookies] = useCookies();
    const {upgrade, setUpgrade}=useContext(PostsContext)
    const [message, setMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [postData, setPostData] = useState(data)
    const [pinPostData, setPinPostData] = useState(data)
    let location = useLocation()

    useEffect(() => {
      const config = {
        method: "GET",
        credentials: "include",
        withCredentials: true, // specify this if you need cookies
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
      };
      
      fetch(`https://loka-database.herokuapp.com/${data.type}/${data._id}`, config)
        .then((response) => response.json())
        .then((result) => {
          if (result.errors) {
            console.log("errors from Pin GET post :>> ", result.errors);
          } else {
            setPinPostData(result);
          }
      })
      .catch((error) => console.log('error from squareAvatar pinData fetch ', error));
    }, [])
    
   
    // MUI popper START
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteAnchorEl, setDeleteAnchorEl] = useState(null)
    const openFeatures = Boolean(anchorEl);
    const openPopper = Boolean(deleteAnchorEl);
  
    const handlePopper = (event) => {
      setDeleteAnchorEl(deleteAnchorEl ? null : event.currentTarget);
    };
  
    const popperId = openPopper ? 'simple-popper' : undefined;
  
    const handleFeatures = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setDeleteAnchorEl(null)
    };
    // MUI popper END 

    function handleEdit() {
      setIsEditOpen(true)
    }

    function handleDelete(type, id) {
      const config = {
        method: "delete",
        credentials: 'include', 
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
      };
  
      fetch(`https://loka-database.herokuapp.com/${type}/${id}`, config)
        .then((response) => response.json())
        .then((result) => {
          if (!result.errors) {
            setMessage(result.message);
            setIsModalOpen(true)
          }
        })
        .catch((error) => console.log(error));
    }

    function handleSnackBarClose(event, reason) {
      if (reason === 'clickaway') {
        return;
        }
        setIsModalOpen(false);
        setAnchorEl(null);
        setDeleteAnchorEl(null)
        setIsEditOpen(false)
      if(location.pathname === `/profile/${JSON.parse(localStorage.getItem("profileName"))}` || location.pathname === `/${data.type}`){
        window.location.reload(); 
      }
    }

    return (
      <section className="SquareAvatar">
          <section className="Avatar-Controllers">
          <Pin post={pinPostData}/>
          { JSON.parse(localStorage.getItem("profileName")) === data.authorProfileName && <>
          <IconButton aria-label="edit"
                      aria-controls={openFeatures ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openFeatures ? 'true' : undefined}
                      onClick={handleFeatures}
                      className="editor-icon" >
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl}
                open={openFeatures}
                onClose={handleClose}>
            <MenuItem onClick={handleEdit} ><EditIcon fontSize="small" sx={{ mr: 2 }} color="primary"/>Edit</MenuItem>
            <MenuItem onClick={handlePopper}><DeleteIcon fontSize="small" sx={{ mr: 2 }} color="primary"/>Delete</MenuItem>
            <Popover id={popperId} open={openPopper} anchorEl={deleteAnchorEl} 
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                    <Typography sx={{ p: 2 }}>Want this gone forever ever?</Typography>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button variant="outlined" color="success" 
                              startIcon={<CheckCircleIcon/>} sx={{ mb: 1 }}
                              onClick={() => handleDelete(data.type, data._id)} >YES</Button>
                      <Button variant="outlined" color="error" 
                              startIcon={<CloseIcon/>} sx={{ mb: 1 }}
                              onClick={() => setDeleteAnchorEl(null)} >NO</Button>
                    </Box>     
            </Popover>
          </Menu></>}
        </section> 
    
        <NavLink  to={data.type === 'event' ? `/${data.type}s/`:`/${data.type}/${data._id}`} className="InnerSquareAvatar">
             <section className="imageAvatar">
                <img src={data.image}></img>
                <h2>{data.title}</h2>
              </section> 
        </NavLink>
    
       <Modal open={isModalOpen} onClose={() => {setIsModalOpen(false); setUpgrade(!upgrade)}} >
          <Snackbar open={isModalOpen} autoHideDuration={6000}
              onClose={handleSnackBarClose}
              message={message}
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
      
       <Modal open={isEditOpen} onClose={() => {setIsEditOpen(false)}}
              sx={{ display: 'flex', overflow:'scroll', justifyContent: 'center', alignItems: 'center' }} >
          <Paper elevation={3} sx={{width: '80%', height: '90%', overflow: 'scroll'}}>
              <EditPost postData={postData} setPostData={setPostData} setIsEditOpen={setIsEditOpen} />
          </Paper>
       </Modal>
       

      </section>
    )
  }
  

// Avatars used specially in community page and general search engines.
// this avatar uses nested components to fetch
export const RoundAvatar = ({ name, id, image }) => {
  const { user } = useContext(UserContext)
  const [cookies] = useCookies();

  const author = JSON.parse(localStorage.getItem("profileName")) === name;


  return (
    <section className="ProfileAvatar-CARD">
      <Link to={`/profile/${name}`} key={id} className="RoundAvatarProfile">
        <section className="ImageAvatarProfile">
          <img src={image}></img>
        </section>
        <h2>{name}</h2>
      </Link>
      {author ? <Button disabled style={{ fontSize: "1rem", padding: '0.5em 1em' }} >hey its me</Button> : <Follow name={name} />}

    </section>
  );
};

// Seasonal avatar
export const SeasonalAvatar = ({ name, id, image }) => {
  return (
    <section className="AvatarR">
      <NavLink to={name === 'More' ? `/seasonal` : `/seasonal/${name}`} key={id} className="RoundAvatar">
        <section className="imageAvatar produceIcon">
          <img src={image}></img>
        </section>
        <h2>{name}</h2>
      </NavLink>
    </section>
  );
};

// AVATARS for POSTS
export const PostHeaderAvatar = ({ id, name, image }) => {
  return (
    <Link to={`/profile/${name}`} key={id} className="HeaderAvatar">
      <section className="headAvatar">
        <img src={image}></img>
      </section>
      <h2>{name}</h2>
    </Link>
  );
};

export const PostCommentsAvatar = ({ id, name, image }) => {
  return (
    <Link to={`/profile/${name}`} className="CommentAvatar">
      <section className="comAvatar">
        <img src={image}></img>
      </section>
      <h2>{name}</h2>
    </Link>
  );
};
