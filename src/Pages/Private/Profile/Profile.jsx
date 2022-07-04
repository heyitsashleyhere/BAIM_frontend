import React, { useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../../../contexts/PostContext.js'
import { AnimationContext } from '../../../contexts/AnimationContext.js'
import { SquareAvatar } from '../../../components/Private/Avatars-Links/Avatars.jsx'
import { Follow } from '../../../components/Private/Buttons/Follow/Follow.jsx'
import { SectionNav } from '../../../components/Private/section-header/SectionNav.jsx'
import './profile.scss';



export const Profile = () => {
  const { postCategories, users, setUsers } = useContext(PostsContext)
  const { windowWidth } = useContext(AnimationContext)
  const { profileName } = useParams()
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(windowWidth > 1024 ? true : false)
  }, [windowWidth])

  const currentUser = JSON.parse(localStorage.getItem('user'))

  const [beauties, setBeauties]=useState([])
  const [artsCrafts, setArtsCrafts]=useState([])
  const [gardens, setGardens]=useState([])
  const [recipes, setRecipes]=useState([])
  const [events, setEvents]=useState([])

  const [display, setDisplay] = useState(null)
  const [message, setMessage] = useState(null)

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const profileUser = users.find(user => user.profileName === profileName)

  useEffect(() => {   
    fetch(`http://localhost:7000/user/${profileUser._id}`, { method: "GET", headers: { "Content-Type": "application/json" } })
    .then((response) => response.json())
    .then((result) => {
           if(result.errors){
              console.log('errors from Profile GET user :>> ', result.errors);
           } else {
            setFollowers(result.followers || [])
            setFollowing(result.following || [])
           }
    })
    .catch((error) => console.log(`error from Follow request`, error));

    const config = {
      method: "GET",
      credentials: 'include', // specify this if you need cookies
      headers: { "Content-Type": "application/json" }
    };
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
    postCategories.map(cat => {
      fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config)
      .then((response) => response.json())
      .then((result) => {
          if(!result.errors) { 
            if(result === []) {
              currentUser.profileName === profileName ? setMessage('You have not posted anything yet') : setMessage('This person has not posted anything yet')
            } else {
            switch (cat) {
              case 'beauty':
                setBeauties(result);
                break;
              case 'artsCraft':
                setArtsCrafts(result);
                break;
              case 'garden':
                setGardens(result);
                break;
              case 'recipe':
                setRecipes(result);
                break;
              case 'event':
                setEvents(result);
                break;
            }
            }

          } else {
            console.log('profile PostCategory fetch errors :>> ', result.errors);
          }
        })
      .catch((error) => console.log('profile PostCategory fetch errors :>> ', error));
    })
  }, [users])


  function showPostCategoryButton(Category) {
    if(Category.length > 0) {
      return (
      <div className='posts-btn-wrapper'>
        <button onClick={(e) => setDisplay(Category[0].type)} data={Category}>{Category[0].type === 'artsCraft' ? 'arts and crafts' :  Category[0].type}</button>
        <p>{Category.length} items</p>
      </div>)
    }
  }
 
  function displayAvatars(type) {
    switch (type) {
      case 'beauty':
        return beauties.map((data, i) => <SquareAvatar key={'profilePage-avatar'+ i} data={data} />);
      case 'artsCraft':
        return artsCrafts.map((data, i) => <SquareAvatar key={'profilePage-avatar'+ i} data={data} />);
      case 'garden':
        return gardens.map((data, i) => <SquareAvatar key={'profilePage-avatar'+ i} data={data} />);
      case 'recipe':
        return recipes.map((data, i) => <SquareAvatar key={'profilePage-avatar'+ i} data={data} />);
      case 'event':
        return events.map((data, i) => <SquareAvatar key={'profilePage-avatar'+ i} data={data} />);
    }
  }
 
  return (
    <>
      {isMobile && <SectionNav  />}
    <section className="Profile">
      <section className="Profile-inner">

        <section className="Profile-header">
          <button>...</button>

          <section className="Profile-info">
            <img src={profileUser.avatar}></img>
            <section className="Profile-text">
              <h1>{profileUser.profileName}</h1>
              <p>Gardner</p>
              <p>I'm all about plants, and herbs</p>
              <h2>
                {profileUser.userAddress.city} ,{" "}
                {profileUser.userAddress.country}
              </h2>
            </section>
          </section>

          <section className="Profile-followers">
            <Follow />
            <p>{followers.length} followers</p>
            <p>{following.length} following</p>
          </section>
        </section>

        <section className='Profile-Library'>
          <section>
            {showPostCategoryButton(beauties)}
            {showPostCategoryButton(artsCrafts)}
            {showPostCategoryButton(gardens)}
            {showPostCategoryButton(recipes)}
            {showPostCategoryButton(events)}
          </section>
        
          <section>
              {display && displayAvatars(display)}
          </section>
        </section>

      </section>
      </section>
      </>
  )
}