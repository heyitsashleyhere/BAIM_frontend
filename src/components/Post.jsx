import { useContext } from "react";
import { PostsContext } from '../contexts/PostContext.js';


export default function Post({category}) {
    const {inputValues, setInputValues} = useContext(PostsContext)

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
        setPostData({...inputValues, image: base64})
    }

    function handleSubmit(e) {
        e.preventDefault()
        const config ={
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify()
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

            <input type="file" name="video" accept="video/mp4,video/x-m4v,video/*" />
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
                    setPostData({ ...inputValues, tags: toArray })}} />
        </form>
    )
}
