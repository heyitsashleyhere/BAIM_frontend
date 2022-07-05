import React, { useContext } from 'react'
import { PostsContext } from '../../../contexts/PostContext'

import { SquareAvatar } from '../Avatars-Links/Avatars'

export const DisplayPins = (props) => {


  const { myPin }=useContext(PostsContext)

  const { display } = props
  
    switch (display) {
        case "beauty":
          return myPin.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "artsCraft":
          return myPin.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "garden":
          return myPin.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "recipe":
          return myPin.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
        case "event":
          return myPin.map((data, i) => (
            <SquareAvatar key={"profilePage-avatar" + i} data={data} />
          ));
      }
}
