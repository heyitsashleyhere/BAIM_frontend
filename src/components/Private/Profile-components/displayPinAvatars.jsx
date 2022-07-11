import { useContext } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { SquareAvatar } from "../Avatars-Links/Avatars.jsx";

export default function displayPinAvatars(type, beautyPins, artsCraftPins, gardenPins, recipePins, eventPins) {
    const { allBeautyPost, allArtsCraftPost, allGardenPost, allRecipePost, allEventPost, } = useContext(PostsContext)

    function filter(arr1, arr2){
      return arr1.filter(el => {
        return arr2.find(element => {
          return element.postId === el._id
        })
      })

    }

    switch (type) {
      case "beauty":
        return filter(allBeautyPost, beautyPins).map((data, i) => (  
          <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
        ));
      case "artsCraft":
        return filter(allArtsCraftPost, artsCraftPins).map((data, i) => (  
          <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
        ));
      case "garden":
        return filter(allGardenPost, gardenPins).map((data, i) => (  
          <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
        ));
      case "recipe":
        return filter(allRecipePost, recipePins).map((data, i) => (  
          <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
        ));
      case "event":
        return  <EventsTable events={filter(allEventPost, eventPins)} />
        ;
    }
  }