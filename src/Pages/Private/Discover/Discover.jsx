import { useState, useEffect, useRef, useContext } from 'react'
import { AnimationContext } from '../../../contexts/AnimationContext'
import {useNavigate} from "react-router-dom"
import './Discover.scss'
import { SectionNav } from '../../../components/Private/section-header/SectionNav'


export const Discover = () => {
  const { windowWidth } = useContext(AnimationContext)
  const [isMobile, setIsMobile] = useState(false)
  const [index, setIndex] = useState(0);
  const delay = 2500;
  const timeoutRef = useRef(null);

  console.log(windowWidth)
  useEffect(() => {
    setIsMobile(windowWidth > 1024 ? true : false)
  }, [windowWidth])

  const navigate = useNavigate()
  const discover = [
  {
      id: 1,
      name: 'Garden',
      src: require('../../../assets/images/gardens.jpg'),
      path: '/garden',
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
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => 
      setIndex((prevIndex) =>
        prevIndex === discover.length - 1 ? 0 : prevIndex + 1
        ), delay
    )
    return () => {
      resetTimeout();
    };
  }, [index]);


  return (
    <>
    {isMobile && <SectionNav  />}
    <section className="discover">
      <section className="discover-container"
      style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {discover.map((image, index) => {
          return (
          <section className="slide-wrapper" key={image.id}>
              <section className="slide" key={index} style={{backgroundImage : `url(${image.src})`}}></section>
            </section>
          )}
        )}
      </section>
      <section className="discover-header">
        {discover.map((header, idx) => {
          return (
            <section key={idx} className={`title ${index === idx ? 'active' : ''}`}
              onClick={() => navigate(header.path)} ><h1>{header.name}</h1></section>
              )
            })}
      </section>
      </section>
      </>
  )
}