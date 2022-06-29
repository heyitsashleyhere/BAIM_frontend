import { useState, useEffect, useContext } from 'react'
import {PostsContext} from '../../../contexts/PostContext.js'
import { Link, useLocation } from 'react-router-dom'
import {SeasonalAvatar} from '../../Private/Avatars-Links/Avatars'

import './sectionNav.scss'


export const SectionNav = () => {
  const {seasonal} = useContext(PostsContext)
  const [isScrolled, setIsScrolled] = useState(null);
  const [show, setShow] = useState(true);
  const location = useLocation();


  const date = new Date();
  let currentMonth = date.toLocaleString('default', { month: 'long' }).split(" ")[0].toLowerCase();
  // console.log(currentMonth);
  
  const inSeason = seasonal.filter(produce => {
    // produce.in_season.includes(currentMonth)
      return produce.in_season.filter(month => month === currentMonth).length
      // return produce.in_season.some(month => month === currentMonth)
  })

  const firstSeven = inSeason.filter((month,idx) => idx < 7)
  // console.log('firstSeven :>> ', firstSeven);






  

  const discover = [
  {
      id: 1,
      name: 'Gardens',
      src: require('../../../assets/images/gardens.jpg'),
      path: '/gardens',
      description: 'Curious about gardening? share your thoughts, ask  your questions, find your support',
      collection: '115 garderns'
    },
  {
      id: 2,
      name: 'Seasonal',
      src: require('../../../assets/images/seasonal.jpg'),
      path: '/seasonal',
      description: 'find your local Markets and sellers in your city and neighborhood',
      collection: '115 garderns'
    },
  {
      id: 3,
      name: 'Recipes',
      src: require('../../../assets/images/recipes.jpg'),
      path: '/recipe',
      description: 'find your local Markets and sellers in your city and neighborhood',
      collection: '115 garderns'
    },
  {
      id: 4,
      name: 'Beauty',
      src: require('../../../assets/images/beauty.jpg'),
      path: '/beauty',
      description: 'find your local Markets and sellers in your city and neighborhood',
      collection: '115 garderns'
    },
  {
      id: 5,
      name: 'Community',
      src: require('../../../assets/images/growing.jpg'),
      path: '/community',
      description: 'find your local Markets and sellers in your city and neighborhood',
      collection: '115 garderns'
    },
  {
      id: 6,
      name: 'events',
      src: require('../../../assets/images/buy.jpg'),
      path: '/event',
      description: 'find your local Markets and sellers in your city and neighborhood',
      collection: '115 garderns'
    }
  ]

  useEffect(() => {
    // console.log(location.pathname)
    if (location.pathname === '/discover') {
      setShow(false)
    }
    
  }, [location])

  return (
    <section className="section-nav">
      <section className="section-nav-container">
        <section className="avatars">
          <ul>
          {firstSeven.map(({id, name, image}, index) => (
            <SeasonalAvatar id={id} name={name} image={image}  />
          ))}
          </ul>
        </section>
        {show &&(
          <section className="categories">
          <ul>
          {discover.map((category, index) => (
            <li key={category.id} className="category">
              <Link to={category.path}><p>{ category.name }</p></Link>
            </li>
          ))}
          </ul>
          </section>
        )}
      </section>
    </section>
  )
}


