import React, { useContext, useState, useEffect } from 'react'
import { PostsContext } from '../../../contexts/PostContext'
import { SquareAvatar } from '../Avatars-Links/Avatars'

export const ProfileFeed = (props) => {
    const { data } = props; //data is the interest
    // const [ allCollections, setAllCollections ] = useState([])
    const { allBeautyPost, allArtsCraftPost, allGardenPost, allRecipePost, allEventPost, postCategories,
      setAllArtsCraftPost, setAllBeautyPost, setAllGardenPost, setAllRecipePost, setAllEventPost,}=useContext(PostsContext)
    let myFeed = []
    const allCollections = [allBeautyPost, allArtsCraftPost, allGardenPost, allRecipePost, allEventPost] 
    useEffect(() => {
      postCategories.map(cat => {
        fetch(`http://localhost:7000/${cat === "arts-and-craft" ? 'artsCraft' : cat}/`)
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

    // postCategories.map(cat => {
    //   fetch(`http://localhost:7000/${cat}/`)
    //     .then((response) => response.json())
    //     .then((result) => {
    //       if (!result.errors) {
    //         switch (cat) {
    //           case 'beauty':
    //             setAllBeautyPost(result);
    //             break;
    //           case 'artsCraft':
    //             setAllArtsCraftPost(result);
    //             break;
    //           case 'garden':
    //             setAllGardenPost(result);
    //             break;
    //           case 'recipe':
    //             setAllRecipePost(result);
    //             break;
    //           case 'event':
    //             setAllEventPost(result);
    //             break;
    //         }
    //       } else {
    //         console.log('fetch from PostContext :>> ', result.errors);
    //       }
    //     })
    //     .catch((error) => console.log('fetch from PostContext :>> ', error));
    // })
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
  console.log('allCollections', allCollections)

  return (
    <>
        { myFeed.map((item, i) => <SquareAvatar data={item} key={`myfeed`+i} />)}
        {/* {allCollections.map.map((item, i) => <SquareAvatar data={item} key={`myfeed-allCollections`+i} />)} */}
    </>
   
  )
}
