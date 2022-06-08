import { ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { storage } from "../firebase.js"
import { PostsContext } from '../contexts/PostContext.js'
import { useState, useRef, useContext } from 'react'


export default function ImageInput({ editData, setEditData}){

    console.log(editData)

    // const { inputValues, setInputValues}=useContext(PostsContext)
    
    const [ progress, setProgress ] = useState(0)
    const [ imageUrl, setImageUrl ] = useState()
    const img = useRef()

    function fileHandler(e){
        e.preventDefault()
        setImageUrl(URL.createObjectURL(img.current.files[0]))

        const url = uploadFile(img.current.files[0])
    }


    function uploadFile(file){

        if(!file){return}
        const storageRef= ref(storage,`/files/image/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot)=>{
            const prog= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog)
        }, (err) => console.log(err), 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((imgURL)=>setEditData({...editData, profilePicture: imgURL}))
        })
    }

    function deleteFile(file){

        if(inputValues.image){
            const storage = getStorage()
            const imageRef = ref(storage, `${editData.profilePicture}`)

            deleteObject(imageRef).then(()=>{
                console.log('imageRef', img)
                setEditData({...editData, profilePicture:""})
                setProgress(0)
                setImageUrl('')
            }).catch((error)=>{
                console.log(error)
            })
        }
    }

    console.log(editData.profilePicture)

    // I have to find more about this according to some research in the 
    function updateFile(file){

        if(inputValues.image){
            const storage=getStorage()
            const imageRef = ref(storage,`${inputValues.image}`)

        }



    }



    return(
        <section className="image">
            <section className="image-container">
                { editData.profilePicture ? <img src={editData.profilePicture} width="620" height="240"></img> : null }
            </section>
            <section className="input-image">
            <input ref={img} type="file" accept="image/*" className="input"/>
            <button type="submit" onClick={fileHandler}>Upload</button>
            <button onClick={deleteFile}>Delete</button>

            </section>

            <p>{progress}</p>

        </section>
    )



}