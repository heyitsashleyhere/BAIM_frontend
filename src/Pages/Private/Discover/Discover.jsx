import { useState, useEffect, useRef } from 'react'

import gsap from 'gsap'

// import Seasonal from '../../../assets/images/seasonal.jpg'
// import Recept from '../../../assets/images/recipes.jpg'
// import Beauty from '../../../assets/images/beauty.jpg'
// import Community from '../../../assets/images/growing.jpg'
// import Gardens from '../../../assets/images/gardens.jpg'
// import Markets from '../../../assets/images/markets.jpg'

// import './discover.scss'
// import './discover2.scss'
import './discover3.scss'


import { useLocation } from 'react-router-dom'

export const Discover = () => {
  const [isMobile, setIsMobile] = useState(false)

  //* MOBILE //creating an array of refs to group all collection titles
  const titleRefs = useRef([])
  titleRefs.current = []

  //* creating an array of refs to group all collection images
  const imageRefs = useRef([])
  imageRefs.current = []

  //* creating an array of refs to group all content text elements
  const contentRefs = useRef([])
  contentRefs.current = []

  const revealRef = useRef([])
  revealRef.current = []

    // if the screen size is less than 768px then setState to true and then display burger menu;
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // to check the screen size to display the corresponding navigation links
  useEffect(() => {
    // console.log(sideNavRef.current.style.display );
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    //listening on the window resize event
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log('isMobile :>> ', isMobile);
  
  useEffect(() => {
    console.log('titleRefs.current', titleRefs.current)
    isMobile &&
      gsap.fromTo(titleRefs.current, {
      y: '100%',
      opacity: 0
    }, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      stagger: 0.2
    })
  },[isMobile])


  //*desktop animation
  useEffect(() => {
    console.log(imageRefs.current);
    const tl = gsap.timeline({stagger: 0.2});
    tl.fromTo(revealRef.current, {
      width: '0%'
    }, {
      duration: 0.8,
      opacity: 1,
      width: '100%',
      // skewX: 10,
      ease: 'power2.inOut',
    })
    tl.fromTo(contentRefs.current, {
      opacity: 0,
    }, {
      duration: 1,
      opacity: 1,
      ease: 'power2.inOut',
    })
    tl.from(imageRefs.current, {
      duration: 0.8,
      delay: -0.8,
      ease: 'power2.inOut'
    })
  },[])
  
  //* Mobile breakpoint
  //* adding collections title to the titleRefs array
  const addToCollection = (title) => {
    titleRefs.current.push(title)
  }

  //* Tablet & Desktop breakpoints
  //* adding images section to the imagesRef array
  const addToImages = (image) => {
    imageRefs.current.push(image)
  }
  //* adding sections text content to array of refs
  const addToContents = (text) => {
    contentRefs.current.push(text)
  }

  const addToReveal = (el) => {
  revealRef.current.push(el);
}
  
  return (
    <section className="discover">

      {isMobile ? (
        <section className="mobile-wrapper">
        {
          discover.map(item => {
            return (
              <section key={item.name} ref={addToCollection} className="mobile-wrapper-title">
                <h1  key={item.id} className="title">{item.name}</h1>  
              </section>
              )
            })}
        </section>
      ) : (
        <>
        {discover.map((collection, i) => {
          return (
            <section key={i} className="wrapper">
              <section ref={addToReveal}  className="wrapper-overlay">
                <section ref={addToImages} className={`wrapper-image d-${collection.name}`}
                  style={{ backgroundImage: `url(${collection.src})` }}
                >
                </section>
              </section>
              <section ref={addToContents} className="wrapper-text">
                <section className="wrapper-text-header">
                  <h2>{collection.name}</h2>
                  <p>{collection.description}</p>
                </section>
                <section className="wrapper-text-footer">
                  <p>{collection.collection}</p>
                </section>
              </section>
              </section>
              )
            })}
            </>
      )}
      


    </section>

  )
}


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
      path: '/recipes',
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
      path: '/events',
      description: 'find your local Markets and sellers in your city and neighborhood',
      collection: '115 garderns'
    }
]
  

{/* <>
       <section className="Wrapper" onClick={e => useLocation()}>
        <section className="wrapper-image d-gardens">
        <img src={Gardens} alt="vegetables on the table"></img>
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
        <img src={Seasonal} alt="vegetables on the table"></img>
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
        <img src={Recept} alt="vegetables on the table"></img>
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
        <img src={Beauty} alt="vegetables on the table"></img>
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
        <img src={Community} alt="vegetables on the table"></img>
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
        <img src={Markets} alt="vegetables on the table"></img>
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
     
      </> */}