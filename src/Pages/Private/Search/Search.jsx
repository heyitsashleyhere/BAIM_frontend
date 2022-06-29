import { useContext } from 'react'
import { SquareAvatar } from '../../../components/Private/Avatars-Links/Avatars.jsx'
import { PostsContext } from '../../../contexts/PostContext.js'

import './search.scss';

export default function Search() {
    const { searchResult, searchInput, searchCat, searchOpt } = useContext(PostsContext)
    
    // console.log('searchResult :>> ', searchResult);
    // console.log('searchInput:>> ', searchInput);
    // console.log('searchChat:>> ', searchCat);
    // console.log('searchOpt:>> ', searchOpt);

    const isEmpty = searchResult.length > 0;

    return (
        <section className='Search'>
        <section className="search-wrapper">
           <section className="search-info">
                 <h2>Search {searchCat} on {searchOpt}: {searchInput}</h2>
              { isEmpty ? <p>{searchCat} items : {searchResult.length}</p> :<p>{searchCat} Item not found</p> }
            </section>
         { isEmpty ? <section className="search-collection">
           {searchResult.map(post => (
                    <SquareAvatar data={post} key={post._id}/>
                ))}
            </section> : null }
        </section> 
            
        </section>
    )
}
