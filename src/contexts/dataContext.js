import React, { useEffect, useState } from 'react'



export const DataContext = React.createContext("");

export default function DataContextProvider(props){


    const [ searchCriteria, setSearchCriteria] = useState("criteria")
    console.log("searchCriteria",searchCriteria);
    const [searchInput, setSearchInput ] = useState("")
    console.log("searchInput",searchInput);

    function searchHandler(e) {
        setSearchInput(e.target.value.toLowerCase());
      }

    const [ recipes, setRecipes ] = useState([])

    useEffect(()=> {
    fetch("http://localhost:7000/recipe")
    .then(response=>response.json())
    .then(result=>setRecipes(result))
    .catch(error=>console.log(error.message))

    },[])

    const contextData = {
        recipes, setRecipes, searchCriteria, setSearchCriteria, searchInput, setSearchInput, searchHandler   
    }





    return (
        <DataContext.Provider value={contextData}>
            {props.children}
        </DataContext.Provider>
    )
}