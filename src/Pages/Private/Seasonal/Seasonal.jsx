import React from 'react'
import { useContext } from 'react'
import { SeasonalAvatar } from '../../../components/Private/Avatars-Links/Avatars'
import { PostsContext } from '../../../contexts/PostContext'

import './seasonal.scss';


export const Seasonal = () => {

  const { seasonal }= useContext(PostsContext)


  const date = new Date();
  let currentMonth = date.toLocaleString('default', { month: 'long' }).split(" ")[0].toLowerCase();
  console.log(currentMonth);
  
  const inSeason = seasonal.filter(produce => {
    // produce.in_season.includes(currentMonth)
      return produce.in_season.filter(month => month === currentMonth).length
      // return produce.in_season.some(month => month === currentMonth)
  })

 const planting = seasonal.filter(produce => produce.planting_time.filter(month => month === currentMonth).length)

 const seedingIndoor = seasonal.filter(produce=> produce.seeding_indoor.filter(month => month === currentMonth).length )
 const seedingOutdoor = seasonal.filter(produce => produce.seeding_outdoor.filter(month=> month === currentMonth).length) 
 
 console.log("seedingIndoor",seedingIndoor)
 
 
 return (
    <section className="Seasonal">
      <section className="Seasonal-inner">

        <section className="Seasonal-Hero">
          <img></img>
        </section>
        
        <section className="Seasonal-wrapper">
          <h1>{currentMonth[0].toUpperCase() + currentMonth.substring(1)} In season</h1>
          <section className="Seasonal-wrapper-collection">
          { inSeason.map(item => <SeasonalAvatar name={item.name} id={item._id} image={item.image}/>)}
          </section>
        </section>

        <section className="Seasonal-wrapper">
          <h1>Seeding Indoor</h1>
          <section className="Seasonal-wrapper-collection">
            {seedingIndoor.map(item => <SeasonalAvatar name={item.name} id={item._id} image={item.image}/>)}
          </section>
        </section>

        <section className="Seasonal-wrapper">
          <h1>Seeding Outdoor</h1>
          <section className="Seasonal-wrapper-collection">
            {seedingOutdoor.map(item => <SeasonalAvatar name={item.name} id={item._id} image={item.image}/>)}
          </section>
        </section>

        <section className="Seasonal-wrapper">
          <h1>Planting season</h1>
          <section className="Seasonal-wrapper-collection">
            {planting.map(item => <SeasonalAvatar name={item.name} id={item._id} image={item.image}/>)}
          </section>
        </section>

        <section className="Seasonal-wrapper">
          <h1>library</h1>
          <section className="Seasonal-wrapper-collection">
            { seasonal.map(item => <SeasonalAvatar name={item.name} id={item._id} image={item.image}/>)}
          </section>
        </section>

        </section>
      </section>
   
  )
}
