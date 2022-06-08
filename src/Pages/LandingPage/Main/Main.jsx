import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

import './video.scss'
import VideoFile from '../assets/Lake.mp4'
import Logo from '../assets/svgLogo.svg'


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
      }, '+=8.3')
      .to(imageRef.current, {
        y: 0,
        duration: 2,
        opacity: 1,
        ease: 'power2.inOut'
      }, '-=3')
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
  )
}

export default Main