import React, { useState, useEffect }  from 'react'

export const PostsContext = React.createContext(null)

function PostsContextProvider({ children }){
    const postCategories = ["beauty", "artsCraft", "garden", "recipe", "event"] 
    const [data, setData] = useState({})
    
    const [inputValues, setInputValues] = useState({ title: "", description: "", link: "", tags: "" })
    const [address, setAddress] = useState({ street: "", streetNumber: "", zip: "", city: "", country: ""})

    // search filter
    const [searchResult, setSearchResult] = useState([])
    
    
    const [users, setUsers]=useState([])
    const [beauties, setBeauties]=useState([])
    const [artsCrafts, setArtsCrafts]=useState([])
    const [gardens, setGardens]=useState([])
    const [recipes, setRecipes]=useState([])
    const [events, setEvents]=useState([])

    const [ upgrade, setUpgrade]=useState(false)

    // const [loading, setLoading]=useState(true)
    

    useEffect(() => {
        fetch("http://localhost:7000/user")
        .then(response => response.json())
        .then(result => {setUsers(result)})
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/beauty")
        .then(response => response.json())
        .then(result => setBeauties(result))
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/artsCraft")
        .then(response => response.json())
        .then(result => setArtsCrafts(result))
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/garden")
        .then(response => response.json())
        .then(result => setGardens(result))
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/recipe")
        .then(response=>response.json())
        .then(result=>setRecipes(result))
        .catch(error=>console.log(error.message))

        fetch("http://localhost:7000/event")
        .then(response=>response.json())
        .then(result=>setEvents(result))
        .catch(error=>console.log(error.message))

    }, [upgrade])
    


    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }
    
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setInputValues({...inputValues, image: base64})
    }

    function handleDelete() {
        const config ={
            method: "DELETE",
            // headers: { Authorization: 'Bearer ' + "token"}, this is automated with cookies
            body: JSON.stringify(inputValues)
        }
    
        fetch(`http://localhost:7000/${category}`, config)
            .then((response) => response.json())
            .then((result) => console.log(category, "fetch result:", result))
            .catch((error) => console.log(error));
    }

    const postsContextValue = {
        postCategories,
        inputValues, setInputValues,
        address, setAddress,
        convertToBase64, handleFileUpload,
        data, setData, 
        users, setUsers, 
        recipes, setRecipes,
        beauties, setBeauties, 
        gardens, setGardens,
        events, setEvents, 
        artsCrafts, setArtsCrafts, 
        upgrade, setUpgrade,
        searchResult, setSearchResult
    }

    return (
        <PostsContext.Provider value={postsContextValue}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsContextProvider