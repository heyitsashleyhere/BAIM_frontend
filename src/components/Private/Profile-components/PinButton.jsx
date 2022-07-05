import React, { useContext } from 'react'
import { PostsContext } from '../../../contexts/PostContext'

export const PinButton = (props) => {

  const { display, setDisplay , myPin}=useContext(PostsContext)
  console.log('myPin',myPin)

        const {profileUser, Category} = props
       
      

       
        function openCollection(category){
          console.log('open-collection',category)
            if(display){
              setDisplay(null)
            }else{
              setDisplay(category)
            }
           
          }
    
        profileUser.pin.forEach(item => {
          let found = Category.find(object =>object._id === item)
    
          if(found){
            myPin.push(found)
          }
          console.log('myPin',myPin)
        
        })
    
   
    
        if(myPin.length > 0){
    
          return (
              <div className="posts-btn-wrapper">
                <div className={`${myPin[0].type} post-btn-container`} onClick={e=> openCollection(myPin[0].type)} data={myPin}></div>
                {myPin[0].type === "artsCraft"
                    ? <p>artsCraft</p>
                    : <p>{myPin[0].type}</p>}
              </div>
            );
          
    
        }
    
      

}
