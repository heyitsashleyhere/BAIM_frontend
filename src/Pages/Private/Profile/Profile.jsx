import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../../contexts/PostContext.js";
import { Follow } from "../../../components/Private/Buttons/Follow/Follow.jsx";
import { ProduceNavbar } from "../../../components/Private/section-header/ProduceNavbar.jsx";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar.jsx";
import UserEdit from "../../../components/Private/Forms/UserEdit/UserEdit.jsx";
import showPostCategoryButton from "../../../components/Private/Profile-components/showPostCategoryButton.jsx";
import showPinCategoryButton from "../../../components/Private/Profile-components/showPinCategoryButton.jsx";
import displayAvatars from "../../../components/Private/Profile-components/displayAvatars.jsx";
import displayPinAvatars from "../../../components/Private/Profile-components/displayPinAvatars.jsx";
import ProfileControllers from "../../../components/Private/Profile-components/ProfileControllers.jsx";
import { EventsTable } from "../../../components/Private/Avatars-Links/Tables"
import { ProfileFeed } from "../../../components/Private/Profile-components/ProfileFeed.jsx";
import { Modal, Typography, Paper } from "@mui/material";
import "./profile.scss";
import { FollowPage } from "../../../components/Private/Profile-components/FollowPage.jsx";

export const Profile = () => {
  const { postCategories, upgrade, setUpgrade, profileData, setProfileData } = useContext(PostsContext);
  const { profileName } = useParams();
  const [cookies] = useCookies();

  // user library
  const [beauties, setBeauties] = useState([]);
  const [artsCrafts, setArtsCrafts] = useState([]);
  const [gardens, setGardens] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [events, setEvents] = useState([]);
  // user data
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([])
  const [display, setDisplay] = useState(null)
  const [message, setMessage] = useState(null)
  const [postMessage, setPostMessage] = useState(null)
  const [pinMessage, setPinMessage] = useState(null)
  const [pins, setPins] = useState([])
  const [beautyPins, setBeautyPins] = useState([])
  const [artsCraftPins, setArtsCraftsPins] = useState([])
  const [gardenPins, setGardenPins] = useState([])
  const [recipePins, setRecipePins] = useState([])
  const [eventPins, setEventPins] = useState([])
  // pop up Modals
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUserEditOpen, setUserEditOpen] = useState(false)
  // toggle
  const [showMyPosts, setShowMyPosts] = useState(false)
  const [showMyPins, setShowMyPins] = useState(false)
  const [showCatPosts, setShowCatPosts] = useState(false)
  const [showCatPins, setShowCatPins] = useState(false)

  //toggle followpage
  const [ isFollowers, setIsFollowers]=useState(false)
  const [ isFollowing, setIsFollowing]=useState(false)

  useEffect(() => {
    setPostMessage(null)
    setPinMessage(null)
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
          console.log('result :>> ', result);
          if (result['beauty'].length == 0 && result['artsCraft'].length == 0 && result['garden'].length == 0 && result['recipe'].length == 0 && result['event'].length == 0) {
            cookies.profileName === profileName
            ? setPostMessage("You have not posted anything yet")
            : setPostMessage("This person has not posted anything yet");
          }

          if (result.pin.length == 0) {
            cookies.profileName === profileName
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

    postCategories.map((cat) => {
      fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config)
        .then((response) => response.json())
        .then((result) => {
          console.log('result :>> ', result);
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
  }, [profileName, upgrade]);

  useEffect(() => {
    pins.forEach(pin => {
      switch (pin.postType) {
        case "beauty":
          setBeautyPins([...beautyPins, pin]);
          break;
        case "artsCraft":
          setArtsCraftsPins([...artsCraftPins, pin]);
          break;
        case "garden":
          setGardenPins([...gardenPins, pin]);
          break;
        case "recipe":
          setRecipePins([...recipePins, pin]);
          break;
        case "event":
          setEventPins([...eventPins, pin]);
          break;
      }
    })
  }, [pins, profileData, upgrade])

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

  function openFollowers(){

    if(isFollowing){
      setIsFollowing(false)
      setFollowers(!isFollowers)
    }
      setFollowers(!isFollowers)
    
  }

  function openFollowing(){
    if(isFollowers){
      setIsFollowers(false)
      setIsFollowing(!isFollowing)
    }
    setIsFollowing(!isFollowing)
  }


  return (
    <>
      <ProduceNavbar />
      <DiscoverNavbar />
      <section className="Profile">
        {profileData && (
          <div className="Profile-inner">
            <div className="Profile-header">
              {cookies.profileName === profileName && (
                <ProfileControllers handleEdit={handleEdit} handleDelete={handleDelete} isUserEditOpen={isUserEditOpen} className="Profile-editor"/>
              )}

              <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false); setUpgrade(!upgrade) }} >
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

                // ! MURAD : check this logic with the Modal thing 
                {/* <button className="NavLink-Black" onClick={openFollowers}>{followers.length} followers</button>
                <button className="NavLink-Black" onClick={openFollowing}>{following.length} following</button>

               { isFollowers && <FollowPage follow={following} type={followers}/>  }
               { isFollowing && <FollowPage follow={following} type={following}/> } */}
              </div>
            </div>

            <div className="Profile-Collection-Nav">
              <button className="LokaB" onClick={() => { setShowMyPosts(!showMyPosts); setShowMyPins(false); setShowCatPosts(false) }}>Posts</button>
              <button className="LokaB" onClick={() => { setShowMyPosts(false); setShowMyPins(!showMyPins) }}>Pins</button>
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
                  {showPinCategoryButton(beautyPins, display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(artsCraftPins, display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(gardenPins, display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(recipePins, display, setDisplay, showCatPins, setShowCatPins)}
                  {showPinCategoryButton(eventPins, display, setDisplay, showCatPins, setShowCatPins)}
                  {/* <EventsTable events={eventPins} />; */}


                </div>}
            </div>

            <div className="Profile-Lib-Collection">
              {display && showCatPosts && displayAvatars(display, beauties, artsCrafts, gardens, recipes, events)}
            </div>

            <div className="Profile-Lib-Collection">
              {display && showCatPins && displayPinAvatars(display, beautyPins, artsCraftPins, gardenPins, recipePins, eventPins)}
            </div>

            <section className="Profile-Feed">
              <h2 className="Profile-Feed-Header">{profileData.profileName} feed</h2>
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
