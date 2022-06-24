import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/src/all'
// Styles
import './main.scss'
import '../../../../src/app.scss'
// Logo
import Logo from '../../../assets/pngLogo.png'

gsap.registerPlugin(ScrollTrigger)

const ctaVideos = [
  {
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat est necessitatibus soluta ipsam sunt nesciunt repudiandae velit architecto, a sapiente.',
    src : process.env.PUBLIC_URL + '/landingVideos/strawberries.webm',
  },
  {
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat est necessitatibus soluta ipsam sunt nesciunt repudiandae velit architecto, a sapiente.',
  src : process.env.PUBLIC_URL + '/landingVideos/lemons.webm',
  }
]

const Main = () => {

  //refs used for gsap animation 
  const overlayRef = useRef(null)
  const imageRef = useRef(null)
  const sloganRef = useRef(null)

  //a function to add multiple refs to an array
  const videosRef = useRef([])
  videosRef.current = []


 //Main page Animations
  useEffect(() => {
    const tl = gsap.timeline()
      tl.to(overlayRef.current, {
        duration: 1,
        opacity: 1,
        backgroundColor: `#000000`,
        ease: 'power2.inOut'
      })
      .to(imageRef.current, {
        y: 0,
        duration: 0.8,
        opacity: 1,
        ease: 'power2.inOut'
      })
      .to(sloganRef.current, {
        y: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      })
  }, [])

//revealing promo sections and promo video onscroll animation
useEffect(() => {

  videosRef.current.forEach(video => {
    ScrollTrigger.create({
      trigger: video,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => video.play(),
      onEnterBack: () => video.play(),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause()
    })
  })

}, [])

//adding promo videos to an array for ScrollTrigger
const addToRefs = (el) => {
  videosRef.current.push(el)  
}

  return (
  <>
    <section className="cta-container">
      <div className="cta-wrapper" ref={overlayRef}>
        <div className="cta-content">
          <img ref={imageRef} src={Logo} alt="LOKA" className='logo' />
          <div  className="slogan">
            <h1 ref={sloganRef}>
              Lokalisieren
            </h1>
          </div>
        </div>
      </div>
    </section>
    
    <section className="promo-vid-container">
      {ctaVideos.map((video, index) => {
        return (
          <div key={`video` + index}>
          <div className="promo-vid-overlay">
          <div className="promo-vid-overlay-content" key={index}>
            <h1 className="promo-vid-content-title">{video.text}</h1>
            </div>
            </div>
          <div className="promo-vid-wrapper" key={index}>
            <video ref={addToRefs} className="promo-vid" src={video.src} type="video/webm" autoPlay loop muted playsInline />
              {/* <source  />
            </video> */}
            </div>
          </div>
        )
      })}
    </section>
  </>
  )
}

export default Main