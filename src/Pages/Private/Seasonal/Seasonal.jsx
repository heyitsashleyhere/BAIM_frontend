import React from 'react'

export const Seasonal = () => {
  return (
    <section className="Pages">
        <section className="Hero">
            <section className="hero-image seasonal">
            
            </section>
        
            <section className="Hero-text">
                <h1>Seasonal</h1>
                <p>Harvest calendar</p>
            </section>

        </section>
        <section className="Library-wrapper">
      <section className="lib-wrapper-header">
        <h2>Breakfast </h2>
        <p>{foods.length} items</p>
      </section>
      <section className="Library-container">
      {foods.map(item =><Avatar id={item.id} image={item.image} title={item.title}/>)}
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
    </section>
  )
}
