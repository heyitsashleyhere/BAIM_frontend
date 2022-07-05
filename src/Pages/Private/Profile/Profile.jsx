import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../../contexts/PostContext.js";
import { SquareAvatar } from "../../../components/Private/Avatars-Links/Avatars.jsx";
import { Follow } from "../../../components/Private/Buttons/Follow/Follow.jsx";
import { ProduceNav } from "../../../components/Private/section-header/ProduceNav.jsx";
import UserEdit from "../../../components/Private/Forms/UserEdit/UserEdit.jsx";
import { Modal,	IconButton,	Button,	Typography,	Menu,	MenuItem,	Popover,	Box, Paper} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import "./profile.scss";



export const Profile = () => {
  const { postCategories, upgrade, setUpgrade } = useContext(PostsContext);
  const { profileName } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [beauties, setBeauties] = useState([]);
  const [artsCrafts, setArtsCrafts] = useState([]);
  const [gardens, setGardens] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [events, setEvents] = useState([]);

  const [profileData, setProfileData] = useState(null)
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([])
  const [display, setDisplay] = useState(null);
  const [message, setMessage] = useState(null);
  const [postMessage, setPostMessage] = useState(null)

  useEffect(() => {
    const config = {
      method: "GET",
      credentials: "include", // specify this if you need cookies
      headers: { "Content-Type": "application/json" },
    }

    fetch(`http://localhost:7000/user/${profileName}`, config)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          console.log("errors from Profile GET user :>> ", result.errors);
        } else {
          if (result['beauty'].length == 0 && result['artsCraft'].length == 0 && result['garden'].length == 0 && result['recipe'].length == 0 && result['event'].length == 0) {
            currentUser.profileName === profileName
            ? setPostMessage("You have not posted anything yet")
            : setPostMessage("This person has not posted anything yet");
          }
          setProfileData(result)
          setFollowers(result.followers);
          setFollowing(result.following);
        }
      })
      .catch((error) => console.log(`error from profileName request in Profile`, error));

    postCategories.map((cat) => {
      fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config)
        .then((response) => response.json())
        .then((result) => {
          if (!result.errors) {
              switch (cat) {
                case "beauty":
                  setBeauties(result);
                  break;
                case "artsCraft":
                  setArtsCrafts(result);
                  break;
                case "garden":
                  setGardens(result);
                  break;
                case "recipe":
                  setRecipes(result);
                  break;
                case "event":
                  setEvents(result);
                  break;
              }
            } else {
            console.log(
              `profile ${cat} fetch errors :>> `,
              result.errors
            )
          }
        })
        .catch((error) =>
          console.log(`profile ${cat} fetch errors :>> `, error)
        );
    });
  }, []);

  function showPostCategoryButton(Category) {
    if (Category.length > 0) {
      return (
        <div className="posts-btn-wrapper">
          <button onClick={(e) => setDisplay(Category[0].type)} data={Category}>
            {Category[0].type === "artsCraft"
              ? "arts and crafts"
              : Category[0].type}
          </button>
          <p>{Category.length} items</p>
        </div>
      );
    }
  }

  function displayAvatars(type) {
    switch (type) {
      case "beauty":
        return beauties.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "artsCraft":
        return artsCrafts.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "garden":
        return gardens.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "recipe":
        return recipes.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "event":
        return events.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
    }
  }

  // MUI popper START
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null)
  const openFeatures = Boolean(anchorEl);
  const openPopper = Boolean(deleteAnchorEl);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUserEditOpen, setUserEditOpen] = useState(false)

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
    setUserEditOpen(true)
  }

  function handleDelete(id) {
    const config = {
      method: "delete",
      credentials: 'include', 
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:7000/user/${id}`, config)
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
    <>
      <ProduceNav />
      <section className="Profile">
        {profileData && (
          <div className="Profile-inner">
            <div className="Profile-header">
              {profileData.profileName === profileName && (
                <section className="Profile-Controllers">
                  <IconButton
                    aria-label="edit"
                    aria-controls={openFeatures ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openFeatures ? "true" : undefined}
                    onClick={handleFeatures}
                    className="editor-icon"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openFeatures}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleEdit}>
                      <EditIcon
                        fontSize="small"
                        sx={{ mr: 2 }}
                        color="primary"
                      />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handlePopper}>
                      <DeleteIcon
                        fontSize="small"
                        sx={{ mr: 2 }}
                        color="primary"
                      />
                      Delete
                    </MenuItem>
                    <Popover
                      id={popperId}
                      open={openPopper}
                      anchorEl={deleteAnchorEl}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                      <Typography sx={{ p: 2 }}>
                        Want to delete your account forever ever?
                      </Typography>
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          variant="outlined"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          sx={{ mb: 1 }}
                          onClick={() => handleDelete(profileData._id)}
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
                  </Menu>
                </section>
              )}

              <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false); setUpgrade(!upgrade) }} >
                <Paper elevation={3} className="ProfileEdit-form" 
                       sx={{ width: '80%', padding: '2rem',
                             position: 'absolute', top: '50%', left: '50%',
                             transform: 'translate(-50%, -50%)'
                             }}>
                    <Typography variant="h3" textAlign='center'>
                      {message}
                    </Typography> 
                </Paper>
              </Modal>

              <Modal open={isUserEditOpen} onClose={() => { setUserEditOpen(false); setUpgrade(!upgrade) }} 
                     sx={{ display: 'flex',
                           overflow:'scroll',
                           justifyContent: 'center',
                           alignItems: 'center'
                        }}>
                <UserEdit profileData={profileData} />
              </Modal>

              <div className="Profile-info">
                <img src={profileData.avatar}></img>
                <section className="Profile-text">
                  <h1>{profileData.profileName}</h1>
                  <p>Gardner</p>
                  <p>I'm all about plants, and herbs</p>
                  { profileData.userAddress && (
                  <h2>
                    {profileData.userAddress.city} ,{" "}
                    {profileData.userAddress.country}
                  </h2>
                  )}
                </section>
              </div>

              <section className="Profile-followers">
                <Follow />
                <p>{followers.length} followers</p>
                <p>{following.length} following</p>
              </section>
            </div>

            <section className="Profile-Library">
              <div>
                {showPostCategoryButton(beauties)}
                {showPostCategoryButton(artsCrafts)}
                {showPostCategoryButton(gardens)}
                {showPostCategoryButton(recipes)}
                {showPostCategoryButton(events)}

                {display && displayAvatars(display)}
              </div>
            </section>

            {postMessage && <p>{postMessage}</p>}
          </div>
        )}
      </section>
    </>
  );
}


    // const promises = postCategories.map(cat => fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config))
    // Promise.all(promises)
    //        .then(responses => Promise.all( responses.map(r => r.json())) )
    //        .then(result =>  {
    //         result.forEach(cat => currentUserLibrary[cat[0].type] = cat)
    //         setTest(result)
    //       }) // result.forEach(catArr =>  setCurrentUserLibrary({...currentUserLibrary, [catArr[0].type]: catArr}))
    //        .catch(err => console.error(`from Promise all`, err))

    //       console.log('currentUserLibrary :>> ', currentUserLibrary);
    //       console.log('typeof test :>> ', typeof test);