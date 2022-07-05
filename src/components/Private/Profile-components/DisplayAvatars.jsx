import React, { useContext } from 'react'
import { PostsContext } from '../../../contexts/PostContext'

import { SquareAvatar } from '../Avatars-Links/Avatars'

export const DisplayAvatars = (props) => {
  console.log(1111111, props)

  const { display }=useContext(PostsContext)

  const { beauties, artsCrafts,gardens,recipes,events } = props
  
    switch (display) {
        case "beauty":
          return beauties.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "artsCraft":
          return artsCrafts.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "garden":
          return gardens.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "recipe":
          return recipes.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "event":
          return events.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
      }
}
