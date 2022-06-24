
import React, { useContext } from 'react'

import {SquareAvatar} from '../../../components/Private/Avatars-Links/Avatars'


import './collections.scss'



export const Collections = (props) => {

  const {category, type} =props
  console.log(props)



  return (
    <section className="Collections">
      <section className="Hero">
         <section className={`hero-image ${type}`} ></section>
          <section className="Hero-text">
              <h1>hello</h1>
              <p>YUMMY</p>
          </section> 
      </section> 



 
    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Our collections</h2>
        <p>items</p>
      </section>
      <section className="Library-container">
      {category.map(item =><SquareAvatar id={item._id} image={item.image} path={item.title} title={item.title}/>)}
    </section>
    </section> 
    
</section>


  )
}
