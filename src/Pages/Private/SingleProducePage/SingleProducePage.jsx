import React, { useContext } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { PostsContext } from '../../../contexts/PostContext'
import {MdOutlineArrowBack} from 'react-icons/md'

import './singleProducePage.scss';


export const SingleProducePage = () => {

    const { seasonal }=useContext(PostsContext)

    const { name }= useParams()

    const data = seasonal.find(item => item.name === name)

    const date = new Date();
    let currentMonth = date.toLocaleString('default', { month: 'short' }).split(" ")[0].toLowerCase();

    let navigate = useNavigate()
    
    console.log(data)



  return (
    <section className="Seasonal-page">

      <section className="Seasonal-page-inner">

        <section className="Seasonal-back-button">
        <MdOutlineArrowBack onClick={()=>navigate('/seasonal')} className="Seasonal-button"/>
        </section>
      
        <section className="Seasonal-page-hero">
        <section className="Seasonal-hero-image">
            <img src={data.image}></img>
        </section>
        <section className="Seasonal-hero-title">
          <h2>{data.name}</h2>
          <p>{data.type}</p>
        </section>
        </section>

        <section className="Seasonal-text">
          <section className="Seasonal-description">
              <h3>Description</h3>
              {data.description.split('.').map(item => <p>{item}.</p>)}
          </section>

          <section className="Seasonal-optimal">
              <h3>Optimal sun: {data.optimal_sun}</h3>
              <h3>Optimal soil: {data.optimal_soil}</h3>
          </section>

          <section className="Seasonal-dual">
            
          <section className="Seasonal-schedule">
            <span>
              <h3>Planting</h3>
              <section className="Seasonal-Month">
              {data.planting_time.map(item => <p>{item.substring(0,3).toUpperCase()}</p>)}
              </section>
              </span>
              <span>
              <h3>Seeding Indoor</h3>
                <section className="Seasonal-Month">
                {data.seeding_indoor.map(item => <p>{item.substring(0,3).toUpperCase()}</p>)}
                </section>
              </span>

              <span>
              <h3>Seeding Outdoor</h3>
              <section className="Seasonal-Month">
              {data.seeding_outdoor.map(item => <p>{item.substring(0,3).toUpperCase()}</p>)}
              </section>
              </span>
              <span className="Seasonal-days">
              <h3>Harvesting time: {data.harvest_time} days.</h3>
              </span>
          </section>

          <section className="Seasonal-nutrition">
              <h3>Nutrition</h3>
              <section className="nutrition-board">
                <p>Calories: {data.nutrition.calories}</p>
                <p>Protein: {data.nutrition.protein}</p>
                <p>Carbs: {data.nutrition.carbs}</p>
                <p>Fat: {data.nutrition.fat}</p>
                <p>Calcium: {data.nutrition.calcium}</p>
                <p>Iron: {data.nutrition.calcium}</p>
                <p>Potassium:{data.nutrition.potassium}</p>
                <p>Vitamine A:{data.nutrition.vitamin_a}</p>
                <p>Vitamine C:{data.nutrition.vitamin_c}</p>
              </section>
          </section>
          
          </section>

          <section className="Seasonal-planting">
              <section className="Seasonal-plant-map">
                <h3>Planting consideration</h3>
                {data.planting_considerations.split('.').map(item=><p>{item}.</p>)}
              </section>
              <section className="Seasonal-plant-map">
                <h3>When to Plant</h3>
                {data.when_to_plant.split('.').map(item=><p>{item}.</p>)}
              </section>
              <section className="Seasonal-plant-map">
                <h3>Growing from seed</h3>
                {data.growing_from_seed.split('.').map(item=><p>{item}.</p>)}
              </section>
              <section className="Seasonal-plant">
                <h3>Transplanting</h3>
              <p>{data.transplanting}</p>
              </section>
              <section className="Seasonal-plant">
                <h3>Spacing</h3>
              <p>{data.spacing}</p>
              </section>
              <section className="Seasonal-plant">
                <h3>Watering</h3>
              <p>{data.watering}</p>
              </section>
              <section className="Seasonal-plant">
                <h3>Feeding:</h3>
              <p>{data.feeding}</p>
              </section>
              <section className="Seasonal-plant-map">
                <h3>Other Care:</h3>
              {data.other_care.split('.').map(item=> <p>{item}.</p>)}
              </section>
              <section className="Seasonal-plant">
                <h3>Diseases:</h3>
              <p>{data.diseases}</p>
              </section>
              <section className="Seasonal-plant">
                <h3>Pests:</h3>
              <p>{data.pests}</p>
              </section>
          </section>

          <section className="Seasonal-harvest">
            <section className="Seasonal-plant-map">
                <h3>Harvesting</h3>
                {data.harvesting.split('.').map(item=><p>{item}.</p>)}
              </section>
            <section className="Seasonal-plant">
                <h3>Storage</h3>
                <p>{data.storage}</p>
                </section>
            
            {/* <section className="Seasonal-harvest">
                <h3>good neighbors:</h3>
              <p>{data.good_neighbors.map(item=> <p>{item}</p>)}</p>
              </section>
              <section className="Seasonal-harvest">
                <h3>bad neighbors:</h3>
                <p>{data.bad_neighbors.map(item=><p>{item}</p>)}</p>
              </section> */}
            </section>

        </section>
        
      </section>
      
    </section>
  )
}
