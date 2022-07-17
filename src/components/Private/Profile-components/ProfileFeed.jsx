import React, { useContext, useState, useEffect } from 'react'
import { PostsContext } from '../../../contexts/PostContext'
import { SquareAvatar } from '../Avatars-Links/Avatars'

export const ProfileFeed = (props) => {
    const { data } = props; //data is the interest
    const [ allCollections, setAllCollections ] = useState([])
    const { allArtsCraftPost, allBeautyPost,allGardenPost,allRecipePost, postCategories}=useContext(PostsContext)
    let myFeed = []
    // const allCollections = [allArtsCraftPost,allBeautyPost,allRecipePost,allGardenPost] 
    useEffect(() => {
      postCategories.map(cat => {
        fetch(`http://localhost:7000/${cat}/`)
          .then((response) => response.json())
          .then((result) => {
            if (!result.errors) {
              setAllCollections([...allCollections, result])
            } else {
              console.log('fetch from PostContext :>> ', result.errors);
            }
          })
          .catch((error) => console.log('fetch from PostContext :>> ', error));
        })
    }, [])

    data.forEach(item => {
      let match = []
      if (item === 'arts-and-craft') {
        match = allCollections.map(coll => coll.filter(one => one.type === 'artsCraft'))
      } else {
        match = allCollections.map(coll => coll.filter(one => one.type === item))
      }
      match = match.filter(item => item.length)
      if (match[0]) {
        myFeed = myFeed.concat(match[0]).sort((objA, objB)=> new Date(objB.updatedAt) - new Date(objA.updatedAt))
      }
  })
 

  return (
    <>
        { myFeed.map((item, i) => <SquareAvatar data={item} key={`myfeed`+i} />)}
    </>
   
  )
}
