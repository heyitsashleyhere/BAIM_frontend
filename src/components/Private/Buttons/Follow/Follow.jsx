import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../../../../contexts/PostContext.js'

import { Modal } from "@mui/material";


export const Follow = ({name}) => {
  const { upgrade, setUpgrade, users }=useContext(PostsContext)
  const { profileName } = useParams()
  const [ error, setError ] = useState(null)

  // we can use the localStorage data to check author
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const isAuthor = currentUser.profileName === profileName

  const [profileData, setProfileData] = useState(null)
  // pop up if follow/unfollow
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    if(profileName) {
      fetch(`http://localhost:7000/user/${profileName}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          console.log("errors from Profile GET user :>> ", result.errors);
        } else {
          setProfileData(result)
        }
      })
      .catch((error) => console.log(`error from profileName request in Profile`, error));
    } else {
      fetch(`http://localhost:7000/user/${name}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          console.log("errors from Profile GET user :>> ", result.errors);
        } else {
          setProfileData(result)
        }
      })
      .catch((error) => console.log(`error from profileName request in Profile`, error));
    }


  }, [isModalOpen])
  

  function FollowUser(){
    const config = {
      method: "PATCH",
      credentials: 'include', // specify this if you need cookies
      headers: { "Content-Type": "application/json" }
    }
       
    fetch(`http://localhost:7000/user/${profileData._id}/following`, config)
      .then((response) => response.json())
      .then((result) => {
             if(result.errors){
                    setError(result.errors)
             } else {
              setIsModalOpen(true)
              setUpgrade(!upgrade)
             }
      })
      .catch((error) => console.log(`error from Follow request`, error));
    }

  return (
    <section>
      {profileData && (
          !isAuthor && <button onClick={FollowUser}>{profileData.followers.find(objId => objId == currentUser._id) ? 'Unfollow': 'Follow'}</button>
      )}
      <p>{error}</p>
      {profileData && (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} >
              <p>{`You are now ${profileData.followers.find(objId => objId == currentUser._id) ? `following` : `unfollowing`} ${profileData.profileName}`}</p>
          </Modal>
      )}
    </section>
    
  )
}