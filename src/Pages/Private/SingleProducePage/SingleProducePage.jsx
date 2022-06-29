import React, { useContext } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { PostsContext } from '../../../contexts/PostContext'

import './singleProducePage.scss';


export const SingleProducePage = () => {

    const { seasonal }=useContext(PostsContext)

    const { name }= useParams()

    const data = seasonal.find(item => item.name === name)

    console.log(data)
    


  return (
    <section className="Seasonal-page">
    <section className="Seasonal-page-inner">
      <section className="Seasonal-page-hero">
       <section className="Seasonal-hero-image">
          <img src={data.image}></img>
       </section>
       <section className="Seasonal-hero-title">
        <h2>{data.name}</h2>
        <p>{data.type}</p>
       </section>
      </section>
      <section className="Seasonal-schedule">
      <span>
         <h3>Planting:</h3>
        {data.planting_time.map(item => <p>{item},</p>)}
        </span>
        <span>
         <h3>Seeding Indoor:</h3>
        {data.seeding_indoor.map(item => <p>{item},</p>)}
        </span>
        <span>
         <h3>Seeding Outdoor:</h3>
        {data.seeding_outdoor.map(item => <p>{item},</p>)}
        </span>
        <span>
         <h3>Harvesting time:{data.harvest_time} days</h3>
        </span>
    </section>
    <section className="Seasonal-description">
         <h3>Description:</h3>
        {data.description.split('.').map(item => <p>{item} .</p>)}
        <p>Optimal sun: {data.optimal_sun}</p>
        <p>Optimal soil: {data.optimal_soil}</p>
    </section>

    <section className="Seasonal-planting">
    <section>
      <h3>Planting consideration:</h3>
      {data.planting_considerations.split('.').map(item=><p>{item}.</p>)}
    </section>
    <section>
      <h3>When to Plant:</h3>
      {data.when_to_plant.split('.').map(item=><p>{item}.</p>)}
    </section>
    <section>
      <h3>Growing from seed:</h3>
      {data.growing_from_seed.split('.').map(item=><p>{item}.</p>)}
    </section>
    <section>
      <h3>Transplanting:</h3>
     <p>{data.transplanting}</p>
    </section>
    <section>
      <h3>Spacing:</h3>
     <p>{data.spacing}</p>
    </section>
    <section>
      <h3>Watering:</h3>
     <p>{data.watering}</p>
    </section>
    <section>
      <h3>Feeding:</h3>
     {data.feeding.split('.').map(item=> <p>{item}</p>)}
    </section>
    <section>
      <h3>Other Care:</h3>
     {data.other_care.split('.').map(item=> <p>{item}</p>)}
    </section>
    <section>
      <h3>Diseases:</h3>
     <p>{data.diseases}</p>
    </section>

    </section>

    <section className="Seasonal-harvest">
      <section>
          <h3>Harvesting:</h3>
          {data.harvesting.split('.').map(item=><p>{item}.</p>)}
        </section>
      <section>
          <h3>Harvesting:</h3>
          {data.harvesting.split('.').map(item=><p>{item}.</p>)}
          </section>
      </section>
      <section>
          {/* <h3>Harvesting:</h3>
          {data.harvesting.split('.').map(item=><p>{item}.</p>)} */}
        </section>
      </section>
    

        
    </section>
  )
}
