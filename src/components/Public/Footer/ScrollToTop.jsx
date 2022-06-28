import { useState, useEffect } from 'react'
import * as BsIcons from "react-icons/bs";
import './scrollToTop.scss';


const ScrollToTop = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 200 ? setIsScrolled(true) : setIsScrolled(false)
    })
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  return (
    <div className='scroll-btn-container'>
      {isScrolled && 
        <span className="scroll" onClick={scrollToTop}>
          <BsIcons.BsArrowUpSquare className='scroll-btn'  />
          <BsIcons.BsFillArrowUpSquareFill className='scroll-btn-hover' />
        </span>

}
    </div>
  )
}

export default ScrollToTop




{/* <svg stroke-width="0" viewBox="0 0 16 16" class="scroll-btn" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z">
    </path>
    </svg> */}