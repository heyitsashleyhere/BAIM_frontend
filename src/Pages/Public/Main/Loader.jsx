import { useState, useEffect, useRef, useContext } from 'react'
import { AnimationContext } from '../../../contexts/AnimationContext'
import './loader.scss'

import gsap from 'gsap'

const Loader = ({setLoading}) => {
    const { show, setShow, windowWidth } = useContext(AnimationContext)

  //to change the CTA section video based on the window width
  const desktopVideo = `${process.env.PUBLIC_URL}/landingVideos/commercialTitles.webm`
  const tabletVideo = `${process.env.PUBLIC_URL}/landingVideos/raspberrie.mp4`

  const videoUrl = windowWidth >= 992 ? desktopVideo : tabletVideo;
  const videoTime = windowWidth >= 992 ? 86 : 9;

  
  
  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setLoading(false)
    }, videoTime * 1000)
  
    const skip = setTimeout(() => {
      setShow(true)
    }, 3000)

    return () => {
      clearTimeout(loaderTimer)
      clearTimeout(skip)
    }

  }, [])

  return (
    <section className="loader-container">
      {show ?
        (
        <div className="skip">
          <button className='skip-btn'
            onClick={() => {
            setLoading(false)
              }}>Skip
          </button>
        </div>
        ) : null
      }

      <div className="loader-video-wrapper">
        <video src={videoUrl} autoPlay playsInline muted/>
      </div>
    </section>
  )
}

export default Loader