
import React, { useContext } from 'react'
import {useState , useEffect} from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'

import {RecipesAvatar} from '../../../components/Private/Avatars-Links/Avatars'

import './recipes.scss'

import { PostsContext } from '../../../contexts/PostContext'
import { RecipePost } from '../../../components/Private/RecipePost.jsx/RecipePost'



export const Recipes = () => {

const { recipes, setRecipes }=useContext(PostsContext)
console.log(recipes)

  return (
    <section className="Pages">
      <section className="Hero">
          <section className="hero-image recipes"></section>
          <section className="Hero-text">
              <h1>recipes</h1>
              <p>YUMMY</p>
          </section>
      </section>



 
    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>recipes</h2>
        <p>{recipes.length} items</p>
      </section>
      <section className="Library-container">
      {recipes.map(item =><RecipesAvatar id={item._id} image={item.image} path={item.title} title={item.title}/>)}
    </section>
    </section> 
    
</section>


  )
}
