import React, { useState }  from 'react'

export const PostsContext = React.createContext(null)

function PostsContextProvider({ children }){
    const postCategories = ["beauty", "artsCraft", "garden", "recipe", "event"] 
    const [inputValues, setInputValues] = useState({})


    const postsContextValue = {
        postCategories,
        inputValues, setInputValues
    }

    return (
        <PostsContext.Provider value={postsContextValue}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsContextProvider