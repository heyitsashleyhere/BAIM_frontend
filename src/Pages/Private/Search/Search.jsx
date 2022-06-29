import { useContext } from 'react'
import { SquareAvatar } from '../../../components/Private/Avatars-Links/Avatars.jsx'
import { PostsContext } from '../../../contexts/PostContext.js'

export default function Search() {
    const { searchResult } = useContext(PostsContext)
    console.log('searchResult :>> ', searchResult);
    return (
        <section className='Search'>
            {searchResult.map(post => (
                <SquareAvatar data={post} key={post._id}/>
            ))}
        </section>
    )
}
