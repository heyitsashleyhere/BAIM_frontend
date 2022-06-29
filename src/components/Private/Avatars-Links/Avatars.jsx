import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import './avatars.scss'

import { Modal, IconButton, Button, Typography, Menu, MenuItem, Popover, Box} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

import berry from '../../../assets/logo/raspberry.png'
import { Follow } from '../Buttons/Follow/Follow'
import { UnFollow } from '../Buttons/Unfollow/Unfollow'
import { UserContext } from '../../../contexts/UserContext'
import { PostsContext } from '../../../contexts/PostContext'
import { DeletePost } from '../Buttons/Delete/DeletePost'



// general avatars for the App
  export const SquareAvatar = ({ data }) => {
    const [cookies] = useCookies();
    const {user}=useContext(UserContext)
    const [message, setMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    // let navigate = useNavigate()
   
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

    }

    function handleDelete(type, id) {
      // console.log('id :>> ', id);
      // console.log('type :>> ', type);
      // setMessage('your post is deleted');
      // setIsModalOpen(true)
      const config = {
        method: "delete",
        credentials: 'include', 
        headers: { "Content-Type": "application/json" },
      };
  
      fetch(`http://localhost:7000/${type}/${id}`, config)
        .then((response) => response.json())
        .then((result) => {
          if (!result.errors) {
            setMessage(result.message);
            setIsModalOpen(true)
          }
        })
        .catch((error) => console.log(error));

    }


    return (
      <section className="SquareAvatar">
    
        {cookies.profileName === data.authorProfileName && 
          <section className="Avatar-Controllers">
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
          </Menu>
        </section> }
    
        <NavLink to={`${data.type}/${data.title}`} className="InnerSquareAvatar">
             <section className="imageAvatar">
                <img src={data.image}></img>
                <h2>{data.title}</h2>
              </section> 
        </NavLink>
    
       <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} >
          <p>{message}</p>
       </Modal>
        {/* experimental logic for add remove to user collections */}

      </section>
    )
  }

  // Avatars used specially in community page and general search engines.
  // this avatar uses nested components to fetch
  export const RoundAvatar = ({name, id, image,}) => {

    const{user} = useContext(UserContext)

    
    const author = user._id === id
    console.log('auth', author)

    // needs to be done after collections api is done
    // const found = user.collection.follow.find(item => item === user._id)

    return (
      <section className="AvatarR">
          <Link to={`/profile/${name}`} key={id} className="RoundAvatar"> 
         <section className="imageAvatar">
              <img src={image}></img>           
         </section>
              <h2>{name}</h2>
            
                 
      </Link>
       {author ? <p>hey its me</p> : <p>follow</p>}
      {/* disable bellow comment after collections from backend are operative */}
      {/* { auth ?  <img src={berry}></img> : (found ? <Follow logUser={logUser} user={user._id}/> : <UnFollow logUser={logUser} user={user._id}/>)} */}

      </section>

      
    )
  }

  // Seasonal avatar
  export const SeasonalAvatar = ({name, id, image,}) => {

    return (
      <section className="AvatarR">
          <Link to={`/seasonal/${name}`} key={id} className="RoundAvatar"> 
         <section className="imageAvatar">
              <img src={image}></img>           
         </section>
              <h2>{name}</h2>
           </Link>   
      </section> 
      )
    }


  // AVATARS for POSTS
  export const PostHeaderAvatar=({id, name, image})=>{

    return (
      <Link to={`/profile/${name}`} key={id} className="HeaderAvatar"> 
      <section className="headAvatar">
           <img src={image}></img>           
      </section>
           <h2>{name}</h2> 
   </Link>
    )
  }

  export const PostCommentsAvatar=({id, name, image})=>{

    return (
      <Link to={`/profile/${name}`} key={id} className="CommentAvatar"> 
      <section className="comAvatar">
           <img src={image}></img>           
      </section>
           <h2>{name}</h2> 
   </Link>
    )
  }






