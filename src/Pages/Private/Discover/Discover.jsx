import React from 'react'
// import Seasonal from '../../../assets/images/seasonal.jpg'
// import Recept from '../../../assets/images/recipes.jpg'
// import Beauty from '../../../assets/images/beauty.jpg'
// import Community from '../../../assets/images/growing.jpg'
// import Gardens from '../../../assets/images/gardens.jpg'
// import Markets from '../../../assets/images/markets.jpg'

// import './discover.scss'
import './discover2.scss'

import { useLocation } from 'react-router-dom'


export const Discover = () => {



  return (
    <section className="Discover">
    
       <section className="Wrapper" onClick={e => useLocation()}>
        <section className="wrapper-image d-gardens">
        {/* <img src={Gardens} alt="vegetables on the table"></img> */}
        </section>
        <section className="wrapper-text">
            <section className="wrapper-text-header">
            <h2>Gardens</h2>
            <p>Curious about gardening? share your thoughts, ask  your questions, find your support</p>
            </section>
            <section className="wrapper-text-footer">
                <p>115 garderns</p>
            </section>
        </section>
      </section>

      <section className="Wrapper" onClick={e => useLocation()}>
        <section className="wrapper-image d-seasonal">
        {/* <img src={Seasonal} alt="vegetables on the table"></img> */}
        </section>
        <section className="wrapper-text">
            <section className="wrapper-text-header">
            <h2>Seasonal</h2>
            <p>find your local Markets and sellers in your city and neighborhood</p>
            </section>
            <section className="wrapper-text-footer">
                <p>115 vegetables</p>
            </section>
        </section>
      </section>

      <section className="Wrapper" onClick={e => useLocation()}>
        <section className="wrapper-image d-recipes">
        {/* <img src={Recept} alt="vegetables on the table"></img> */}
        </section>
        <section className="wrapper-text">
            <section className="wrapper-text-header">
            <h2>Recipes</h2>
            <p>find your local Markets and sellers in your city and neighborhood</p>
            </section>
            <section className="wrapper-text-footer">
                <p>115 vegetables</p>
            </section>
        </section>
      </section>

      <section className="Wrapper" onClick={e => useLocation()}>
        <section className="wrapper-image d-beauty">
        {/* <img src={Beauty} alt="vegetables on the table"></img> */}
        </section>
        <section className="wrapper-text">
            <section className="wrapper-text-header">
            <h2>Beauty</h2>
            <p>find your local Markets and sellers in your city and neighborhood</p>
            </section>
            <section className="wrapper-text-footer">
                <p>115 vegetables</p>
            </section>
        </section>
      </section>

      <section className="Wrapper" onClick={e => useLocation()}>
        <section className="wrapper-image d-community">
        {/* <img src={Community} alt="vegetables on the table"></img> */}
        </section>
        <section className="wrapper-text">
            <section className="wrapper-text-header">
            <h2>Community</h2>
            <p>find your local Markets and sellers in your city and neighborhood</p>
            </section>
            <section className="wrapper-text-footer">
                <p>115 vegetables</p>
            </section>
        </section>
      </section>

      <section className="Wrapper" onClick={e => useLocation()}>
        <section className="wrapper-image d-events">
        {/* <img src={Markets} alt="vegetables on the table"></img> */}
        </section>
        <section className="wrapper-text">
            <section className="wrapper-text-header">
            <h2>Events</h2>
            <p>find your local Markets and sellers in your city and neighborhood</p>
            </section>
            <section className="wrapper-text-footer">
                <p>115 vegetables</p>
            </section>
        </section>
      </section>
     

    </section>

  )
}
