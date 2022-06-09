import React from 'react'
import {Link} from 'react-router-dom'



export const Allrecipes = () => {
  return (
    <section>

      <Link to="/discover/recipes/chicken"><h1>C</h1></Link>
      <Link to="/discover/recipes/falafel"><h1>F</h1></Link>
      <Link to="/discover/recipes/stew"><h1>stew</h1></Link>
      {/* <Link to="/discover/recipes/chicken_massala"><h1>Massala</h1></Link>
      <Link to="/discover/recipes/chicken-teriaki"><h1>teraiki</h1></Link> */}
    </section>

  )
}
