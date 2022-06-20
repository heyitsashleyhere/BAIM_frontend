import React from 'react'
import { useParams } from 'react-router-dom'


export const RecipePost = () => {

    const recipe=[
        {id:"01", title:'chicken', ingrediantes:['8grams'], author: 'Jack', type: 'soup',image:"https://images.unsplash.com/photo-1651222602706-420ee6ddcecd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
        {id:"02", title:'falafel', ingrediantes:['8grams'], author: 'Hammad', type: 'soup', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
        {id:"03", title:'stew', ingrediantes:['8grams'], author: 'Ivo', type:'main-dish', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
        {id:"04", title:'chicken-teriaki', ingrediantes:['8grams'], author: 'Murad', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
        {id:"05", title:'Chickem-Massala', ingrediantes:['8grams'], author: 'Jay', image:"https://images.unsplash.com/photo-1645432524528-ae76145f67b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}]
      
        const recipes = useParams()
      
        console.log(recipe)


  return (
    <section className="Post-Page" key={recipe.id}>
    <section className="Post-Page-header">
      <button>close</button>
    </section>
        <section className="Post-header">
        <img></img>
        <h2>{recipes.author}</h2>
        </section>
      <section className="Post-hero">
        <img src={recipes.image}></img>
        <section>
          <h1>{recipes.title}</h1>
        </section>
      </section>
      <section className="Post-text">
        <section>{recipes.description}</section>
      </section>
      <section className="Post-tags">
        {recipes.category.map(item => <p>{item}</p>)}
        {recipes.tags.map(item => <p>{item}</p>)}
      </section>


    </section>
   
  )
}
