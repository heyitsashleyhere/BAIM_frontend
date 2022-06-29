import { useState, useEffect, useRef, useContext } from 'react'
import { AnimationContext } from '../../../contexts/AnimationContext'
import {useNavigate} from "react-router-dom"
import './Discover.scss'


export const Discover = () => {
  // const { windowWidth } = useContext(AnimationContext)
  const [isMobile, setIsMobile] = useState(false)
  const [index, setIndex] = useState(0);
  const delay = 2500;
  const timeoutRef = useRef(null);

  const navigate = useNavigate()
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

  // useEffect(() => {
  //   // console.log(sideNavRef.current.style.display );
  //   const handleResize = () => {
  //     if (window.innerWidth < 768) {
  //       setIsMobile(true);
  //     } else {
  //       setIsMobile(false);
  //     }
  //   };

  //   //listening on the window resize event
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);


  return (
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
  )
}





// import { useState, useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { useNavigate } from "react-router-dom";
// // import Seasonal from '../../../assets/images/seasonal.jpg'
// // import Recept from '../../../assets/images/recipes.jpg'
// // import Beauty from '../../../assets/images/beauty.jpg'
// // import Community from '../../../assets/images/growing.jpg'
// // import Gardens from '../../../assets/images/gardens.jpg'
// // import Markets from '../../../assets/images/markets.jpg'

// // Styles
// // import './discover.scss'
// // import './discover2.scss'
// import './discover3.scss'


// export const Discover = () => {
//   const [isMobile, setIsMobile] = useState(false)
//   let navigate = useNavigate()

//   //* MOBILE //creating an array of refs to group all collection titles
//   const titleRefs = useRef([])
//   titleRefs.current = []

//   //* creating an array of refs to group all collection images
//   const imageRefs = useRef([])
//   imageRefs.current = []

//   //* creating an array of refs to group all content text elements
//   const contentRefs = useRef([])
//   contentRefs.current = []

//   const revealRef = useRef([])
//   revealRef.current = []

//     // if the screen size is less than 768px then setState to true and then display burger menu;
//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       setIsMobile(true);
//     }
//   }, []);

//   // to check the screen size to display the corresponding navigation links
//   useEffect(() => {
//     // console.log(sideNavRef.current.style.display );
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsMobile(true);
//       } else {
//         setIsMobile(false);
//       }
//     };

//     //listening on the window resize event
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   console.log('isMobile :>> ', isMobile);
  
//   useEffect(() => {
//     console.log('titleRefs.current', titleRefs.current)
//     isMobile &&
//       gsap.fromTo(titleRefs.current, {
//       y: '100%',
//       opacity: 0
//     }, {
//       duration: 0.8,
//       y: 0,
//       opacity: 1,
//       ease: 'power2.inOut',
//       stagger: 0.2
//     })
//   },[isMobile])


//   //*desktop animation
//   useEffect(() => {
//     console.log(imageRefs.current);
//     const tl = gsap.timeline({stagger: 0.2});
//     tl.fromTo(revealRef.current, {
//       width: '0%'
//     }, {
//       duration: 0.8,
//       opacity: 1,
//       width: '100%',
//       // skewX: 10,
//       ease: 'power2.inOut',
//     })
//     tl.fromTo(contentRefs.current, {
//       opacity: 0,
//     }, {
//       duration: 1,
//       opacity: 1,
//       ease: 'power2.inOut',
//     })
//     tl.from(imageRefs.current, {
//       duration: 0.8,
//       delay: -0.8,
//       ease: 'power2.inOut'
//     })
//   },[])
  
//   //* Mobile breakpoint
//   //* adding collections title to the titleRefs array
//   const addToCollection = (title) => {
//     titleRefs.current.push(title)
//   //* Tablet & Desktop breakpoints
//   //* adding images section to the imagesRef array
//   }
//   const addToImages = (image) => {
//     imageRefs.current.push(image)
//   }
//   //* adding sections text content to array of refs
//   const addToContents = (text) => {
//     contentRefs.current.push(text)
//   }

//   const addToReveal = (el) => {
//   revealRef.current.push(el);
//   }
  
//   return (
//     <section className="discover">

//       {isMobile ? (
//         <section className="mobile-wrapper">
//         {
//           discover.map(item => {
//             return (
//               <section key={item.name} ref={addToCollection} className="mobile-wrapper-title"
//                        onClick={() => navigate(collection.path)}>
//                 <h1  key={item.id} className="title">{item.name}</h1>  
//               </section>
//               )
//             })}
//         </section>
//       ) : (
//         <>
//         {discover.map((collection, i) => {
//           return (
//             <section key={i} className="wrapper" onClick={() => navigate(collection.path)}>
//               <section ref={addToReveal}  className="wrapper-overlay">
//                 <section ref={addToImages} className={`wrapper-image d-${collection.name}`}
//                   style={{ backgroundImage: `url(${collection.src})` }}
//                 >
//                 </section>
//               </section>
//               <section ref={addToContents} className="wrapper-text">
//                 <section className="wrapper-text-header">
//                   <h2>{collection.name}</h2>
//                   <p>{collection.description}</p>
//                 </section>
//                 <section className="wrapper-text-footer">
//                   <p>{collection.collection}</p>
//                 </section>
//               </section>
//               </section>
//               )
//             })}
//             </>
//       )}

//     </section>

//   )
// }


// const discover = [
//   {
//       id: 1,
//       name: 'Gardens',
//       src: require('../../../assets/images/gardens.jpg'),
//       path: '/garden',
//       description: 'Curious about gardening? share your thoughts, ask  your questions, find your support',
//       collection: '115 garderns'
//     },
//   {
//       id: 2,
//       name: 'Seasonal',
//       src: require('../../../assets/images/seasonal.jpg'),
//       path: '/seasonal',
//       description: 'find your local Markets and sellers in your city and neighborhood',
//       collection: '115 garderns'
//     },
//   {
//       id: 3,
//       name: 'Recipes',
//       src: require('../../../assets/images/recipes.jpg'),
//       path: '/recipe',
//       description: 'find your local Markets and sellers in your city and neighborhood',
//       collection: '115 garderns'
//     },
//   {
//       id: 4,
//       name: 'Beauty',
//       src: require('../../../assets/images/beauty.jpg'),
//       path: '/beauty',
//       description: 'find your local Markets and sellers in your city and neighborhood',
//       collection: '115 garderns'
//     },
//   {
//       id: 5,
//       name: 'Community',
//       src: require('../../../assets/images/growing.jpg'),
//       path: '/community',
//       description: 'find your local Markets and sellers in your city and neighborhood',
//       collection: '115 garderns'
//     },
//   {
//       id: 6,
//       name: 'events',
//       src: require('../../../assets/images/buy.jpg'),
//       path: '/event',
//       description: 'find your local Markets and sellers in your city and neighborhood',
//       collection: '115 garderns'
//     }
// ]
