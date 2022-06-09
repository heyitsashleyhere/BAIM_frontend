
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
    <div>

    {recipes.map(item => item.type === 'soup')}




    <section>
    <h2>{recipe.titel}</h2>
    <p>{recipe.ingrediantes}</p>
    <h1>{recipe.author}</h1>
    </section> 
  
    </div>
  )
}
