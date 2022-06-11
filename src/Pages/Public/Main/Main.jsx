import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/src/all'
import './main.scss'

import '../../../../src/app.scss'



import Logo from '../../../assets/pngLogo.png'

gsap.registerPlugin(ScrollTrigger)


const Main = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pDuration, setPDuration] = useState(0)
  const [isEnded, setIsEnded] = useState(false)
  const [show, setShow] = useState(false)


  const videoEl = useRef(null)

  const overlayRef = useRef(null)
  const imageRef = useRef(null)
  const sloganRef = useRef(null)

  const videosRef = useRef([])
  videosRef.current = []


  console.log(pDuration)


//to change the CTA section video based on the window width
  const desktopVideo = `${process.env.PUBLIC_URL}/landingVideos/mainVideo.webm`
  const tabletVideo = `${process.env.PUBLIC_URL}/landingVideos/raspberrie.mp4`

  const videoUrl = windowWidth >= 992 ? desktopVideo : tabletVideo;

  useEffect(() => {
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);


  const handleLoadedMetadata = () => {
    setPDuration(videoEl.current.duration)
  }

//GSAP ANIMATIONS
  // overlay and overlay-contents animations delay timing
  const handleGsapTiming = () => {
    if (windowWidth >= 992) {
      return '+=85'
    } else {
      return '+=7'
    }
  }

  //Main page gsap timeline
  const handleCanPlay = () => {
    const tl = gsap.timeline()
    tl.to(videoEl.current, {
      duration: pDuration,
      opacity: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsEnded(true)
      }
    })
      .to(overlayRef.current, {
        duration: 3,
        opacity: 1,
        backgroundColor: `#000000`,
        ease: 'power2.inOut'
      }, handleGsapTiming())
      .to(imageRef.current, {
        y: 0,
        duration: 0.8,
        opacity: 1,
        ease: 'power2.inOut'
      }, '-=1')
      .to(sloganRef.current, {
        y: 0,

        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setShow(true);
        }
      }, '+=0.8')
    
  }

  //firing animations
  useEffect(() => {
    handleCanPlay()

  }, [isEnded, show])

  //revealing promo sections and promo video onscroll animation
  useEffect(() => {
    if (show) {
      videosRef.current.forEach(video => {
        ScrollTrigger.create({
          trigger: video,
          start: 'top 70%',
          end: 'bottom 30%',
          markers: true,
          onEnter: () => video.play(),
          onEnterBack: () => video.play(),
          onLeave: () => video.pause(),
          onLeaveBack: () => video.pause()
        })
      })
    }
  }, [show])
  
  //adding promo videos to an array for ScrollTrigger
    const addToRefs = (el) => {
      videosRef.current.push(el)  
    console.log(videosRef.current);
  }


  console.log(show)
  return (
  <>
    <section className="cta-container">
      <div className="overlay" ref={overlayRef}>
        <div className="overlay-content">
          <img ref={imageRef} src={Logo} alt="LOKA" className='logo' />
          <div  className="slogan">
            <h1 ref={sloganRef}>
              Lokalisieren
            </h1>
          </div>
        </div>
      </div>
      <div className="cta-video-wrapper">
        <video ref={videoEl} src={videoUrl} autoPlay playsInline muted 
              onLoadedMetadata={handleLoadedMetadata}/>
        </div>
      </section>
      {
        show ? (
          <>
            <section className="promo-vid-container">
              <div className="promo-vid-overlay">
                <div className="promo-vid-overlay-content">
                  <h1 className="overlay-content-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat est necessitatibus soluta ipsam sunt nesciunt repudiandae velit architecto, a sapiente.
                  </h1>
                </div>
              </div>
              <div className="promo-video-wrapper">
                <video ref={addToRefs} src={process.env.PUBLIC_URL + "/landingVideos/strawberries.webm"} playsInline muted loop
                  onLoadedMetadata={handleLoadedMetadata} />
              </div>
            </section>
            <section className="promo-vid-container">
              <div className="promo-vid-overlay">
                <div className="promo-vid-overlay-content">
                  <h1 className="overlay-content-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat est necessitatibus soluta ipsam sunt nesciunt repudiandae velit architecto, a sapiente.
                  </h1>
                </div>
              </div>
              <div className="promo-video-wrapper">
                <video ref={addToRefs} src={process.env.PUBLIC_URL + "/landingVideos/lemons.webm"} playsInline muted loop
                  onLoadedMetadata={handleLoadedMetadata} />
              </div>
            </section>
          </>) : null
        }
    </> 
  )
}

export default Main
