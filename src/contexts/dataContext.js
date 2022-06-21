import React, { useEffect, useState } from 'react'



export const DataContext = React.createContext(null);

export default function DataContextProvider(props){

    const [recipes, setRecipes]=useState([])

    useEffect(()=> {
    fetch("http://localhost:7000/recipe")
    .then(response=>response.json())
    .then(result=>setRecipes(result))
    .catch(error=>console.log(error.message))

    },[])

    const contextData={
        recipes, setRecipes
    }





    return (
        <DataContext.Provider value={contextData}>
            {props.children}
        </DataContext.Provider>
    )
}