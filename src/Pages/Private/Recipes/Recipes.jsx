
import React from 'react'
import {useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Allrecipes } from '../../../components/Private/Allrecipes/Allrecipes'

const foods=[{title:'chicken', ingrediantes:['8grams'], author: 'Jack', type: 'soup'},{title:'falafel', ingrediantes:['8grams'], author: 'Hammad', type: 'soup'},{title:'stew', ingrediantes:['8grams'], author: 'Ivo', type:'main-dish'},{title:'chicken-teriaki', ingrediantes:['8grams'], author: 'Murad'},{title:'Chickem-Massala', ingrediantes:['8grams'], author: 'Jay'}]
export const Recipes = () => {

  const [select, setSelect]=useState(false)

    const { title } = useParams()
    const recipe = foods.find(item => item.title === title)

    const recipes = foods.map(item => <Link to={`/discover/recipes/${item.title}`} ><p>{item.title}</p></Link>)
  return (
    <section className="Pages">
    <section className="Hero">
        <section className="hero-image recipes">
        
        </section>
    
        <section className="Hero-text">
            <h1>recipes</h1>
            <p>Harvest calendar</p>
        </section>

    </section>
</section>
  )
}
