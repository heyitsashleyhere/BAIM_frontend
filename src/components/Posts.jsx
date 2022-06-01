import { useContext } from "react";
import { PostsContext } from '../contexts/PostContext.js'
import Post from './Post.jsx'

export default function Posts() {
    const {postCategories} = useContext(PostsContext)
    
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
