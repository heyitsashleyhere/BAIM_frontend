import React, { useState, useEffect } from 'react'

export const PostsContext = React.createContext(null)


function PostsContextProvider({ children }) {
  const postCategories = ["beauty", "artsCraft", "garden", "recipe", "event"]
  // creating a post
  const [data, setData] = useState({})
  const [inputValues, setInputValues] = useState({ title: "", description: "", link: "", tags: "" })
  const [address, setAddress] = useState({ street: "", streetNumber: "", zip: "", city: "", country: "" })

  // Search filter
  const [searchResult, setSearchResult] = useState([])
  const [searchCat, setSearchCat] = useState("")
  const [searchOpt, setSearchOpt] = useState("")
  const [searchInput, setSearchInput] = useState("")

  // ProduceAPI
  const [seasonal, setSeasonal] = useState([])

  // General ALL posts fetches
  const [users, setUsers] = useState([])
  const [allBeautyPost, setAllBeautyPost] = useState([])
  const [allArtsCraftPost, setAllArtsCraftPost] = useState([])
  const [allGardenPost, setAllGardenPost] = useState([])
  const [allRecipePost, setAllRecipePost] = useState([])
  const [allEventPost, setAllEventPost] = useState([])
  // Profile Page
  const [profileData, setProfileData] = useState(null)
  // for Pin and Profile
  const [postData, setPostData] = useState(null)
  // dependency for fetches
  const [upgrade, setUpgrade] = useState(false)
  // imageInput
  const [image, setImage]=useState({image:""})
  // videoInput
  const[video, setVideo]=useState({video:""})


  useEffect(() => {
    fetch("https://loka-database.herokuapp.com/user")
      .then(response => response.json())
      .then(result => { setUsers(result) })
      .catch(error => console.log(error.message))

    fetch("https://lokalseasons.herokuapp.com/produce")
      .then(response => response.json())
      .then(result => setSeasonal(result))
      .catch(error => console.log(error.message))

    postCategories.map(cat => {
      fetch(`https://loka-database.herokuapp.com/${cat}/`)
        .then((response) => response.json())
        .then((result) => {
          if (!result.errors) {
            switch (cat) {
              case 'beauty':
                setAllBeautyPost(result);
                break;
              case 'artsCraft':
                setAllArtsCraftPost(result);
                break;
              case 'garden':
                setAllGardenPost(result);
                break;
              case 'recipe':
                setAllRecipePost(result);
                break;
              case 'event':
                setAllEventPost(result);
                break;
            }
          } else {
            console.log('fetch from PostContext :>> ', result.errors);
          }
        })
        .catch((error) => console.log('fetch from PostContext :>> ', error));
    })

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
    setInputValues({ ...inputValues, image: base64 })
  }

  function handleDelete() {
    const config = {
      method: "DELETE",
      // headers: { Authorization: 'Bearer ' + "token"}, this is automated with cookies
      body: JSON.stringify(inputValues)
    }

    fetch(`https://loka-database.herokuapp.com/${category}`, config)
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
    allBeautyPost, allArtsCraftPost, allGardenPost, allRecipePost, allEventPost,
    setAllArtsCraftPost, setAllBeautyPost, setAllGardenPost, setAllRecipePost, setAllEventPost,
    upgrade, setUpgrade,
    searchResult, setSearchResult,
    searchCat, setSearchCat,
    searchOpt, setSearchOpt,
    searchInput, setSearchInput,
    seasonal, setSeasonal,
    profileData, setProfileData,
    postData, setPostData,
    image, setImage,
    video, setVideo,
  }

  return (
    <PostsContext.Provider value={postsContextValue}>
      {children}
    </PostsContext.Provider>
  )

}

export default PostsContextProvider;

