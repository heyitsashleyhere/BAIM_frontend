import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { PostsContext } from "../../../contexts/PostContext.js";
import { UserContext } from "../../../contexts/UserContext.js";
import LoadingSpinner from "../../TransitionPage/LoadingSpinner.jsx";
import { Follow } from "../../../components/Private/Buttons/Follow/Follow.jsx";
import { ProduceNavbar } from "../../../components/Private/section-header/ProduceNavbar.jsx";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar.jsx";
import UserEdit from "../../../components/Private/Forms/UserEdit/UserEdit.jsx";
import showPostCategoryButton from "../../../components/Private/Profile-components/showPostCategoryButton.jsx";
import showPinCategoryButton from "../../../components/Private/Profile-components/showPinCategoryButton.jsx";
import displayAvatars from "../../../components/Private/Profile-components/displayAvatars.jsx";
import displayPinAvatars from "../../../components/Private/Profile-components/displayPinAvatars.jsx";
import ProfileControllers from "../../../components/Private/Profile-components/ProfileControllers.jsx";
import { ProfileFeed } from "../../../components/Private/Profile-components/ProfileFeed.jsx";
import { Modal, Typography, Paper } from "@mui/material";
import "./profile.scss";
import { FollowPage } from "../../../components/Private/Profile-components/FollowPage.jsx";

export const Profile = () => {
  const { postCategories, upgrade, setUpgrade, profileData, setProfileData, postData } = useContext(PostsContext);
  const { setIsLogin } = useContext(UserContext)
  const { profileName } = useParams();
  const [cookies] = useCookies();
  let navigate = useNavigate()

  // user library
  const [beauties, setBeauties] = useState(null);
  const [artsCrafts, setArtsCrafts] = useState(null);
  const [gardens, setGardens] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [events, setEvents] = useState(null);
  // user data
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([])
  const [display, setDisplay] = useState(null)
  const [message, setMessage] = useState(null)
  const [postMessage, setPostMessage] = useState(null)
  const [pinMessage, setPinMessage] = useState(null)
  const [pins, setPins] = useState([])
  // pop up Modals
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUserEditOpen, setUserEditOpen] = useState(false)
  // toggle
  const [showMyPosts, setShowMyPosts] = useState(false)
  const [showMyPins, setShowMyPins] = useState(false)
  const [showCatPosts, setShowCatPosts] = useState(false)
  const [showCatPins, setShowCatPins] = useState(false)

  //toggle followPage
  // const [isFollowers, setIsFollowers] = useState(false)
  // const [isFollowing, setIsFollowing] = useState(false)
  const [isFollowingOpen, setIsFollowingOpen] = useState(false)
  const [isFollowersOpen, setIsFollowersOpen] = useState(false)

  useEffect(() => {
    setPostMessage(null)
    setPinMessage(null)

    const config = {
      method: "GET",
      credentials: "include",
      withCredentials: true,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
    }

    fetch(`https://loka-database.herokuapp.com/user/${profileName}`, config)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          console.log("errors from Profile GET user :>> ", result.errors);
        } else {
          if (result['beauty'].length == 0 && result['artsCraft'].length == 0 && result['garden'].length == 0 && result['recipe'].length == 0 && result['event'].length == 0) {
            JSON.parse(localStorage.getItem("profileName")) === profileName
              ? setPostMessage("You have not posted anything yet")
              : setPostMessage("This person has not posted anything yet");
          }

          if (result.pin.length == 0) {
            JSON.parse(localStorage.getItem("profileName")) === profileName
              ? setPinMessage("You have not pinned anything yet")
              : setPinMessage("This person has not pinned anything yet");
          }
          setProfileData(result)
          setPins(result.pin)
          setFollowers(result.followers);
          setFollowing(result.following);
        }
      })
      .catch((error) => console.log(`error from profileName request in Profile`, error));

  }, [profileName, upgrade, postData]);

  useEffect(() => {
    const config = {
      method: "GET",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }

    postCategories.map((cat) => {
      fetch(`https://loka-database.herokuapp.com/${cat}/author/${profileName}/`, config)
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
  }, [profileName, showMyPosts, showCatPosts])


  function handleEdit() {
    setUserEditOpen(true)
  }

  function handleUserDelete(id) {
    const config = {
      method: "delete",
      credentials: 'include',
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
    };

    fetch(`https://loka-database.herokuapp.com/user/${id}`, config)
      .then((response) => response.json())
      .then((result) => {
        if (!result.errors) {
          setMessage(result.message);
          setIsModalOpen(true)
          setIsLogin(false);
          localStorage.removeItem('avatar');
					localStorage.removeItem('id');
					localStorage.removeItem('profileName');
        }
      })
      .catch((error) => console.log(error));
  }


  if (!profileData || !beauties
    || !artsCrafts || !gardens
    || !recipes || !events) {
    return <LoadingSpinner />
  }

  return (
    <>
      <ProduceNavbar />
      <DiscoverNavbar />
      <section className="Profile">
        {profileData && (
          <div className="Profile-inner">
            <div className="Profile-header">
              {JSON.parse(localStorage.getItem("profileName")) === profileName && (
                <ProfileControllers handleEdit={handleEdit} handleUserDelete={handleUserDelete} isUserEditOpen={isUserEditOpen} className="Profile-editor" />
              )}

              <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false); navigate("/main"); setIsLogin(false); window.location.reload();}} >
                <Paper elevation={3} className="ProfileEdit-form"
                  sx={{
                    width: '80%', padding: '2rem',
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                  <Typography variant="h3" textAlign='center'>
                    {message}
                  </Typography>
                </Paper>
              </Modal>

              <Modal open={isUserEditOpen} onClose={() => { setUserEditOpen(false); setUpgrade(!upgrade); }}
                sx={{
                  display: 'flex',
                  overflow: 'scroll',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Paper elevation={3} sx={{ width: '80%', height: '90%', overflow: 'scroll' }}>
                  <UserEdit setUserEditOpen={setUserEditOpen} />
                </Paper>
              </Modal>


              <div className="Profile-info">
                <img src={profileData.avatar}></img>
                <section className="Profile-text">
                  <h1>{profileData.profileName}</h1>
                  <p>"{profileData.status}"</p>
                  {profileData.userAddress && (
                    <h2>
                      {profileData.userAddress.city} ,{" "}
                      {profileData.userAddress.country}
                    </h2>
                  )}
                </section>
              </div>

              <div className="Profile-followers">
                <Follow className="Profile-follow-button" />
                <button className="NavLink-Black" onClick={() => setIsFollowersOpen(true)}>{followers.length} followers</button>
                <button className="NavLink-Black" onClick={() => setIsFollowingOpen(true)}>{following.length} following</button>

                <Modal open={isFollowingOpen} onClose={() => setIsFollowingOpen(false)}>
                  <Paper elevation={1} sx={{ width: '80%', height: '90%', overflow: 'scroll', position: "fixed", top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <FollowPage follow={following} type='following' />
                  </Paper>
                </Modal>

                <Modal open={isFollowersOpen} onClose={() => setIsFollowersOpen(false)}>
                  <Paper elevation={1} sx={{ width: '80%', height: '90%', overflow: 'scroll', position: "fixed", top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <FollowPage follow={followers} type='followers' />
                  </Paper>
                </Modal>

              </div>
            </div>

            <div className="Profile-Collection-Nav">
              <button className="LokaB" onClick={() => { setShowMyPosts(!showMyPosts); setShowMyPins(false); setShowCatPosts(false); setShowCatPins(false) }}>Posts</button>
              <button className="LokaB" onClick={() => { setShowMyPosts(false); setShowMyPins(!showMyPins); setShowCatPosts(false); setShowCatPins(false) }}>Pins</button>
            </div>

            <div className="Profile-Collection">
              {showMyPosts &&
                <div className="Profile-Library">
                  {postMessage && <p>{postMessage}</p>}
                  {showPostCategoryButton(beauties, display, setDisplay, showCatPosts, setShowCatPosts)}
                  {showPostCategoryButton(artsCrafts, display, setDisplay, showCatPosts, setShowCatPosts)}
                  {showPostCategoryButton(gardens, display, setDisplay, showCatPosts, setShowCatPosts)}
                  {showPostCategoryButton(recipes, display, setDisplay, showCatPosts, setShowCatPosts)}
                  {showPostCategoryButton(events, display, setDisplay, showCatPosts, setShowCatPosts)}
                </div>}

              {showMyPins &&
                <div className="Profile-Library">
                  {pinMessage && <p>{pinMessage}</p>}
                  {showPinCategoryButton(pins.filter(pin => pin.postType === "beauty"), display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(pins.filter(pin => pin.postType === "artsCraft"), display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(pins.filter(pin => pin.postType === "garden"), display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(pins.filter(pin => pin.postType === "recipe"), display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(pins.filter(pin => pin.postType === "event"), display, setDisplay, showCatPins, setShowCatPins)}
                </div>}
            </div>

            <div className="Profile-Lib-Collection">
              {display && showCatPosts && displayAvatars(display, beauties, artsCrafts, gardens, recipes, events)}
            </div>

            <div className="Profile-Lib-Collection">
              {display && showCatPins && displayPinAvatars(display, pins)}
            </div>

            <section className="Profile-Feed">
              <h2 className="Profile-Feed-Header">{profileData.profileName === JSON.parse(localStorage.getItem("profileName")) ? 'Your' : `${profileData.profileName}'s`} feed</h2>
              <section className="Profile-Lib-Collection">
                <ProfileFeed data={profileData.interests} />
              </section>

            </section>
          </div>
        )}
      </section>
    </>
  )
}
