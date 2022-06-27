import React, { useState, useEffect }  from 'react'

export const PostsContext = React.createContext(null)

function PostsContextProvider({ children }){
    const postCategories = ["beauty", "artsCraft", "garden", "recipe", "event"] 
    const [data, setData] = useState({})
    
    const [inputValues, setInputValues] = useState({ title: "", description: "", link: "", tags: "" })
    const [address, setAddress] = useState({ street: "", streetNumber: "", zip: "", city: "", country: ""})
    
    
    const [ users, setUsers]=useState([])
    const [beauty, setBeauty]=useState([])
    const [arts, setArts]=useState([])
    const [garden, setGarden]=useState([])
    const [recipe, setRecipe]=useState([])
    const [event, setEvent]=useState([])

    const [ upgrade, setUpgrade]=useState(false)
    

    useEffect(() => {
        // postCategories.map(category => {
        //     let url = `http://localhost:7000/${category}`
        //     const config = {
        //       method: "GET"
        //     }
        
        //     fetch(url, config)
        //       .then(res => res.json())
        //       .then(result => setData({...data, [`${category}`]: result}))
        //       .catch(console.error)
        // })

        fetch("http://localhost:7000/user")
        .then(response => response.json())
        .then(result => setUsers(result))
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/beauty")
        .then(response => response.json())
        .then(result => setBeauty(result))
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/artsCraft")
        .then(response => response.json())
        .then(result => setArts(result))
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/garden")
        .then(response => response.json())
        .then(result => setGarden(result))
        .catch(error => console.log(error.message))

        fetch("http://localhost:7000/recipe")
        .then(response=>response.json())
        .then(result=>setRecipe(result))
        .catch(error=>console.log(error.message))

        fetch("http://localhost:7000/event")
        .then(response=>response.json())
        .then(result=>setEvent(result))
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
        data, setData, recipe, setRecipe,
        users, setUsers, beauty, setBeauty, garden, setGarden,
        event, setEvent, arts, setArts, upgrade , setUpgrade

    }

    return (
        <PostsContext.Provider value={postsContextValue}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsContextProvider