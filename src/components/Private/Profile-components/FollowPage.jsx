
import React from 'react'
import { useState, useContext } from "react"
import { PostsContext } from '../../../contexts/PostContext'
import { RoundAvatar } from '../Avatars-Links/Avatars'

import './followPage.scss'

export const FollowPage = (props) => {

  const { users } = useContext(PostsContext)

  const { follow, type } = props

  console.log('follow', follow)

  function filter(arr1, arr2) {
    return arr1.filter(el => {
      return arr2.find(element => {
        return String(element) === String(el._id)
      })
    })

  }
  console.log('following')



  return (
    <div className="Follow">
      <section className="Follow-header">
        <h2>{type}</h2>
      </section>
      <section className="Follow-body">
        {filter(users, follow).map(item => <RoundAvatar key={item._id} name={item.profileName} id={item._id} image={item.avatar} />)}
      </section>
    </div>
  )
}
