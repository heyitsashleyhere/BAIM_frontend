import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

import Header from '../../../components/landing-page/header/Header'
import './main.scss'
import '../../../styles/index.scss'
import VideoFile from '../../../assets/raspberrie.mp4'

import Logo from '../../../assets/pngLogo.png'


const Main = () => {
  const videoEl = useRef(null)
  const overlayRef = useRef(null)
  const imageRef = useRef(null)
  const sloganRef = useRef(null)

  const [pDuration, setPDuration] = useState(0)
  const [isEnded, setIsEnded] = useState(false)

  const handleLoadedMetadata = () => {
    setPDuration(videoEl.current.duration)
  }
  console.log(pDuration)

  const handleCanPlay = () => {
    const tl = gsap.timeline()
    tl.to(videoEl.current, {
      // duration: pDuration,
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
      }, '-=2')
      .to(imageRef.current, {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: 'power2.inOut'
      },'-=1')
      .to(sloganRef.current, {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: 'power2.inOut'
      }, '-=1')
    
  }
  
  useEffect(() => {
    handleCanPlay()

  }, [isEnded])
  

  return (
    <>
      <Header  />
    <div className="video-wrapper">
      <video ref={videoEl} src={VideoFile} autoPlay playsInline muted
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
    </>
  )
}

export default Main