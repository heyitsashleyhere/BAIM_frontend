import { useContext } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { SquareAvatar } from "../Avatars-Links/Avatars.jsx";
// import { EventsTable } from "../Avatars-Links/Tables.jsx"
import { EventsTable } from '../../../Pages/Private/Events/EventsTable'

export default function displayPinAvatars(type, pins) {
  const { allBeautyPost, allArtsCraftPost, allGardenPost, allRecipePost, allEventPost, } = useContext(PostsContext)

  function filter(arr1, arr2) {
    return arr1.filter(el => {
      return arr2.find(element => {
        return element.postId === el._id
      })
    })

  }

  switch (type) {
    case "beauty":
      return filter(allBeautyPost, pins.filter(pin => pin.postType === "beauty")).map((data, i) => (
        <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
      ));
    case "artsCraft":
      return filter(allArtsCraftPost, pins.filter(pin => pin.postType === "artsCraft")).map((data, i) => (
        <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
      ));
    case "garden":
      return filter(allGardenPost, pins.filter(pin => pin.postType === "garden")).map((data, i) => (
        <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
      ));
    case "recipe":
      return filter(allRecipePost, pins.filter(pin => pin.postType === "recipe")).map((data, i) => (
        <SquareAvatar key={"profilePage-pinAvatar" + i} data={data} />
      ));
    case "event":
      return <EventsTable data={filter(allEventPost, pins.filter(pin => pin.postType === "event"))} />
        ;
  }
}
