import { useContext, useEffect } from "react";
import { PostsContext } from '../contexts/PostContext.js'
import Post from './Post.jsx'

export default function Posts() {
    const {postCategories} = useContext(PostsContext)

    useEffect(() => {
        postCategories.map(category => {
            let url = `http://localhost:7000/${category}`
            const config = {
              method: "GET"
            }
        
            fetch(url, config)
              .then(res => res.json())
              .then(console.log)
              .catch(console.error)
        })

    }, [])
    
    
    return (
        <div className="Posts">
            {postCategories.map(category => (
                <div key={category} >
                    <h2>Post for {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                    <Post category={category} />
                </div>
            ))}
        </div>
    )
}
