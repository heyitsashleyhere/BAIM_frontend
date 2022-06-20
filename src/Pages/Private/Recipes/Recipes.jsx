
import React from 'react'
import {useState} from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'

import {ProfileAvatar, RecipesAvatar} from '../../../components/Private/Avatars-Links/Avatars'

import './recipes.scss'
import profiles from '../../Public/Team/teamData.js'
import { RecipePost } from '../../../components/Private/RecipePost.jsx/RecipePost'

const foods=[
  {id:"01", title:'chicken', ingrediantes:['8grams'], author: 'Jack', type: 'soup',image:"https://images.unsplash.com/photo-1651222602706-420ee6ddcecd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
  {id:"02", title:'falafel', ingrediantes:['8grams'], author: 'Hammad', type: 'soup', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
  {id:"03", title:'stew', ingrediantes:['8grams'], author: 'Ivo', type:'main-dish', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
  {id:"04", title:'chicken-teriaki', ingrediantes:['8grams'], author: 'Murad', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
  {id:"05", title:'Chickem-Massala', ingrediantes:['8grams'], author: 'Jay', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}]


export const Recipes = () => {

  // const [select, setSelect]=useState(false)

  // const { title } = useParams()
  // console.log(title)

    // type arrays. entrance, breakfast, maindish, soup, juices, sandwishes, dessert 
 
    const recipe = foods.find(item => item.title === foods.title)
    const recipes = foods.map(item => <Link to={`/discover/recipes/${item.title}`} ><p>{item.title}</p></Link>)
    
    // type arrays. entrance, breakfast, maindish, soup, juices, sandwishes, dessert 

  return (
    <section className="Pages">
      <section className="Hero">
          <section className="hero-image recipes"></section>
          <section className="Hero-text">
              <h1>recipes</h1>
              <p>YUMMY</p>
          </section>
      </section>

    <section className="collection-wrapper">

    <section className="collection-inner">
    <button>
      <img></img>
      <p>breakfast</p>
    </button>
    <button>
      <img></img>
      <p>soups</p>
    </button>
    <button>
      <img></img>
      <p>main dish</p>
    </button>
    <button>
      <img></img>
      <p>salads</p>
    </button>
    <button>
      <img></img>
      <p>sandwishes</p>
    </button>
    <button>
      <img></img>
      <p>juices</p>
    </button>
    <button>
      <img></img>
      <p>deserts</p>
    </button>

    </section>

    </section>

  {/* <section className="Main-Wrapper"> */}
    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Breakfast </h2>
        <p>{foods.length} items</p>
      </section>
      <section className="Library-container">
      {foods.map(item =><RecipesAvatar id={item.id} image={item.image} title={item.title}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Soups</h2>
        <p>{foods.length} items</p>
      </section>
      <section className="Library-container">
      {foods.map(item =><RecipesAvatar id={item.id} image={item.image} title={item.title}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Main Dish & salads</h2>
        <p>{foods.length} items</p>
      </section>
      <section className="Library-container">
      {foods.map(item =><RecipesAvatar id={item.id} image={item.image} title={item.title}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Sandwishes</h2>
        <p>{foods.length} items</p>
      </section>
      <section className="Library-container">
      {foods.map(item =><RecipesAvatar id={item.id} image={item.image} title={item.title}/>)}
    </section>
    </section>

    <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Juices</h2>
        <p>{foods.length} items</p>
      </section>
      <section className="Library-container">
      {foods.map(item =><RecipesAvatar id={item.id} image={item.image} title={item.title}/>)}
    </section>
    </section>


   
</section>


  )
}
