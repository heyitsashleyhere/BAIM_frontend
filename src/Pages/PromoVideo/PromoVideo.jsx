import { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
// context
import { AnimationContext } from '../../contexts/AnimationContext.js'
// styles
import './promoVideo.scss'
import * as Icons from "react-icons/md";

const PromoVideo = () => {
  const { windowWidth, setIsNav } = useContext(AnimationContext)
  const [show, setShow] = useState(false)

  const skipBtn = useRef(null)

  let navigate = useNavigate();
  //to change the CTA section video based on the window width
  const desktopVideo = `${process.env.PUBLIC_URL}/landingVideos/lokaPromoVideo.webm`
  const tabletVideo = `${process.env.PUBLIC_URL}/landingVideos/raspberrie.mp4`

  const videoUrl = windowWidth >= 992 ? desktopVideo : tabletVideo;


  useEffect(() => {
    const skip = setTimeout(() => {
      setShow(true)
    }, 3000)

    return () => {
      clearTimeout(skip)
    }
  }, [])

  useEffect(() => {
    gsap.fromTo(skipBtn.current, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })
  }, [show])



  return (
    <section className="promo-container">
      <div className="promo-video-wrapper">
        <video src={videoUrl} autoPlay playsInline onEnded={() => {
          setIsNav(true)
          localStorage.setItem('showNav', 'showNav')
          navigate('/main')
        }} />
      </div>

      <>
        {show && (
          <button ref={skipBtn} onClick={() => {
            setIsNav(true)
            localStorage.setItem('showNav', 'showNav')
            navigate('/main')
          }} className='skip-btn'>Skip <Icons.MdSkipNext className='skip-icon' /></button>
        )}

      </>
    </section>

  )
}

export default PromoVideo
