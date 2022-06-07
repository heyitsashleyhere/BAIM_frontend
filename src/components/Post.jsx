import { useContext } from "react";
import { PostsContext } from '../contexts/PostContext.js';


export default function Post({category}) {
    const {inputValues, setInputValues, address, setAddress,
           handleFileUpload} = useContext(PostsContext)
    
    function handleSubmit(e) {
        e.preventDefault()
        setInputValues({...inputValues, address})
        const config ={
                method: "POST",
                credentials: 'include', // specify this if you need cookies
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputValues)
        }

        fetch(`http://localhost:7000/${category}`, config)
            .then((response) => response.json())
            .then((result) => console.log(category, "fetch result:", result))
            .catch((error) => console.log(error));
    }

    return (
        <form className="PostForm" onSubmit={handleSubmit}>
            <input type="text" name="title" 
                   placeholder="title"
                   onChange={e => setInputValues({...inputValues, title: e.target.value})} />

            <input type="text" name="description" 
                   placeholder="description"
                   onChange={e => setInputValues({...inputValues, description: e.target.value})} />

            {category === "event" && (
                <>
                    <h4>Location</h4>
                    <input type="text" name="street" placeholder="street"
                           onChange={e => setAddress({...address, street: e.target.value})}  />
                    <input type="text" name="streetNumber" placeholder="street number"
                           onChange={e => setAddress({...address, streetNumber: e.target.value})}  />
                    <input type="text" name="zip" placeholder="zip code"
                           onChange={e => setAddress({...address, zip: parseInt(e.target.value)})}  />
                    <input type="text" name="city" placeholder="city"
                           onChange={e => setAddress({...address, city: e.target.value})}  />
                    <input type="text" name="country" placeholder="country"
                           onChange={e => setAddress({...address, country: e.target.value})}  />

                    <h4>Time</h4>
                    <input type="date" name="startDate" 
                           onChange={e => setInputValues({...inputValues, startDate: e.target.value}) } 
                           min={(new Date()).toISOString().split('T')[0]} 
                           max={(new Date((new Date()).setFullYear((new Date()).getFullYear() + 1))).toISOString().split('T')[0]}/>

                    <input type="time" name="startTime"
                           onChange={e => setInputValues({...inputValues, startTime: e.target.value}) } />

                    <input type="date" name="endDate" 
                           onChange={e => setInputValues({...inputValues, endDate: e.target.value}) } 
                           min={(new Date()).toISOString().split('T')[0]} 
                           max={(new Date((new Date()).setFullYear((new Date()).getFullYear() + 1))).toISOString().split('T')[0]} />
                    
                    <input type="time" name="endTime"
                           onChange={e => setInputValues({...inputValues, endTime: e.target.value}) }  / >
                </>
                
            )}
            <label htmlFor="video">video:</label>
            <input type="file" name="video" accept="video/mp4,video/x-m4v,video/*" />

            <label htmlFor="video">image:</label>
            <input type="file" name="image" accept=".jpeg, .png, .jpg"
                   onChange={(e) => handleFileUpload(e) }/>

            <input type="text" name="link" 
                   placeholder="link"
                   onChange={e => setInputValues({...inputValues, links: e.target.value})}/>

            <input type="text" name="tags" 
                   placeholder="tags"
                   onChange={e => {
                    const removeSpaces = e.target.value.replace(/\s+/g, '')
                    const toArray = removeSpaces.split(',')
                    setInputValues({ ...inputValues, tags: toArray })}} />

            <button type="submit">Create</button>
        </form>
    )
}
