import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

import Header from '../../../components/Public/header/Header'
import './main.scss'

import '../../../../src/app.scss'
import Logo from '../../../assets/pngLogo.png'


const Main = () => {
  const videoEl = useRef(null)
  const overlayRef = useRef(null)
  const imageRef = useRef(null)
  const sloganRef = useRef(null)
  const textRef = useRef(null)

  const [pDuration, setPDuration] = useState(0)
  const [isEnded, setIsEnded] = useState(false)
  const [show, setShow] = useState(false)

  const handleLoadedMetadata = () => {
    setPDuration(videoEl.current.duration)
  }
  console.log(pDuration)

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
      }, '+=7')
      .to(imageRef.current, {
        y: 0,
        duration: 0.8,
        opacity: 1,
        ease: 'power2.inOut'
      },'-=2')
      .to(sloganRef.current, {
        y: 0,

        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setShow(true)
        }
      }, '-=1.4')

    
  }
  
  useEffect(() => {
    handleCanPlay()

  }, [isEnded, show])

  
  console.log(show)
  return (
    <>
      {/* <Header  /> */}
    <div className="video-wrapper">
     {/* try to use this link instead for video outside the src folder */}
      <video ref={videoEl} src={process.env.PUBLIC_URL + "/landingVideos/raspberrie.mp4"} autoPlay playsInline muted
      onLoadedMetadata={handleLoadedMetadata}/>
      <div ref={overlayRef} className="overlay">
        <div className="overlay-content" style={{overflow: 'hidden'}}>
          <img ref={imageRef} src={Logo} alt="LOKA" className='logo' />
          <div className="slogan" style={{overflow: 'hidden'}}>
            <h1 ref={sloganRef}>Lokalisieren</h1>
          </div>
        </div>
      </div>
      </div>
      {/* {show ? (<section className="main-content">
        <video src={VideoFile} autoPlay playsInline muted
          onLoadedMetadata={handleLoadedMetadata} />
        <div ref={textRef} className="text-overlay">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, dolor.</h1>
        </div>
      </section>) : null
      } */}
    </>
  )
}

export default Main