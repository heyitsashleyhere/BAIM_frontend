import React, { useState }  from 'react'

export const PostsContext = React.createContext(null)

function PostsContextProvider({ children }){
    const postCategories = ["beauty", "artsCraft", "garden", "recipe", "event"] 
    const [inputValues, setInputValues] = useState({ title: "", description: "", link: "", tags: "" })
    const [address, setAddress] = useState({ street: "", zip: "", city: "", country: ""})


    const postsContextValue = {
        postCategories,
        inputValues, setInputValues,
        address, setAddress
    }

    return (
        <PostsContext.Provider value={postsContextValue}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsContextProvider