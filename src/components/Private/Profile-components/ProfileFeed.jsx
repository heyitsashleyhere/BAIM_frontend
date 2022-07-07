import { useContext } from 'react'
import { PostsContext } from '../../../contexts/PostContext.js'
import { SquareAvatar } from '../Avatars-Links/Avatars.jsx'

export const ProfileFeed = (props) => {
    const { data } = props; //data is the interest

    const { allArtsCraftPost, allBeautyPost,allGardenPost,allRecipePost}=useContext(PostsContext)

    const allCollections = [allArtsCraftPost,allBeautyPost,allRecipePost,allGardenPost] 

    let myFeed = []

    data.forEach(item => {

      let match = allCollections.map(coll => coll.filter(one => one.type === item))
      match = match.filter(item => item.length)
      if (match[0]) {
        myFeed = myFeed.concat(match[0]).sort((objA, objB)=> new Date(objB.updatedAt) - new Date(objA.updatedAt))
      }

      
  })
 

  return (
    <section>
        { myFeed.map((item, i) => <SquareAvatar data={item} key={i} />)}
    </section>
   
  )
}