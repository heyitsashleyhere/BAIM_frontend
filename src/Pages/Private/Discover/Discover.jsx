import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
// Context
import { PostsContext } from '../../../contexts/PostContext';
// import Seasonal from '../../../assets/images/seasonal.jpg'
// import Recept from '../../../assets/images/recipes.jpg'
// import Beauty from '../../../assets/images/beauty.jpg'
// import Community from '../../../assets/images/growing.jpg'
// import Gardens from '../../../assets/images/gardens.jpg'
// import Markets from '../../../assets/images/markets.jpg'

// Styles
// import './discover.scss'
import './discover2.scss'

export const Discover = () => {
  const { postCategories } = useContext(PostsContext)
  let navigate = useNavigate()
  
  
  function categoryNavHandler(category) {
    navigate(`/${category}`)
  }

  return (
    <section className="Discover">
      {
        postCategories.map(category => (
          <div className="category-link" key={`${category}` + "-DiscoverPage-link"}
               onClick={() => categoryNavHandler(category)}>
              <br/>
            <h4>{category}</h4>
            <br/>
          </div>
          
        ))
      }

      <div className="category-link" onClick={() => categoryNavHandler('seasonal')}>
              <br/>
        <h4>seasonal</h4>
            <br/>
      </div>

    </section>

  )
}