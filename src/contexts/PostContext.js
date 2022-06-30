import React, { useState, useEffect }  from 'react'

export const PostsContext = React.createContext(null)

function PostsContextProvider({ children }){
    const postCategories = ["beauty", "artsCraft", "garden", "recipe", "event"] 
    // creating a post
    const [data, setData] = useState({})
    const [inputValues, setInputValues] = useState({ title: "", description: "", link: "", tags: "" })
    const [address, setAddress] = useState({ street: "", streetNumber: "", zip: "", city: "", country: ""})

    // Search filter
    const [searchResult, setSearchResult] = useState([])
    const [searchCat, setSearchCat] = useState("")
    const [searchOpt, setSearchOpt] = useState("")
    const [searchInput, setSearchInput] = useState("")

    // ProduceAPI
    const [seasonal, setSeasonal]=useState([])
    
    
    // dependency for fetches
    const [ users, setUsers ] = useState([])
    const [ upgrade, setUpgrade ] = useState(false)
    
    // const [loading, setLoading]=useState(true)
    
    useEffect(() => {
        fetch("http://localhost:7000/user")
        .then(response => response.json())
        .then(result => {setUsers(result)})
        .catch(error => console.log(error.message))

        fetch("https://lokalseasons.herokuapp.com/produce")
        .then(response=>response.json())
        .then(result => setSeasonal(result))
        .catch(error => console.log(error.message))

    }, [upgrade])
    
    // console.log(`seasonal`, seasonal)


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
        upgrade, setUpgrade,
        searchResult, setSearchResult,
        searchCat, setSearchCat,
        searchOpt, setSearchOpt,
        searchInput, setSearchInput,
        seasonal, setSeasonal,
    }

    return (
        <PostsContext.Provider value={postsContextValue}>
            {children}
        </PostsContext.Provider>
    )

}

export default PostsContextProvider;
