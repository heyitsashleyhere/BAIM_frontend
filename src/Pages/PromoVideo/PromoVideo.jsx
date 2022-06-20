import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimationContext } from '../../contexts/AnimationContext.js'

import './promoVideo.scss'

const PromoVideo = () => {
  const { windowWidth, setIsNav  } = useContext(AnimationContext)
  const [show, setShow] = useState(false)


  
  let navigate = useNavigate();
  //to change the CTA section video based on the window width
  const desktopVideo = `${process.env.PUBLIC_URL}/landingVideos/mainVideo.webm`
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


  return (
    <section className="promo-container">

      <div className="promo-video-wrapper">
        <video src={videoUrl} autoPlay playsInline muted onEnded={() => {
              setIsNav(true) 
              navigate('/main') }}/>
      </div>

      <div className='skip-wrapper'>
        {show && (
          <button onClick={() => {
            setIsNav(true) 
            navigate('/main')
            }}>Skip</button>
        )}
        
      </div>
    </section>
    
  )
}

export default PromoVideo
