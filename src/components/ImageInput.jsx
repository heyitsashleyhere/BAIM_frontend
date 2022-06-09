import { ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { useState, useRef, useContext } from 'react'
import { storage } from "../firebase.js"
import { PostsContext } from '../contexts/PostContext.js'
import { UserContext } from '../contexts/UserContext.js'


export default function ImageInput({imageUsage}){
    const { inputValues, setInputValues } = useContext(UserContext)
    const [ progress, setProgress ] = useState(0)
    const [ imageUrl, setImageUrl ] = useState()
    const img = useRef()

    function fileHandler(e) {
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
        }, (err) => console.log("uploadFile error", err), 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((imgURL)=> setInputValues({...inputValues, [`${imageUsage}`]: imgURL}))
        })
    }

    function deleteFile(file){
        if(inputValues[`${imageUsage}`]){
            const storage = getStorage()
            const imageRef = ref(storage, `${inputValues[`${imageUsage}`]}`)

            deleteObject(imageRef).then(()=>{
                console.log('imageRef', img)
                setInputValues({...inputValues, [`${imageUsage}`]:""})
                setProgress(0)
                setImageUrl('')
            }).catch((error)=>{
                console.log(error)
            })
        }
    }

    console.log("checking image URL", inputValues[`${imageUsage}`])

    // I have to find more about this according to some research in the 
    function updateFile(file){

        if(inputValues.image){
            const storage=getStorage()
            const imageRef = ref(storage,`${inputValues[`${imageUsage}`]}`)

        }

    }



    return(
        <section className="image">
            <section className="image-container">
                { inputValues[`${imageUsage}`] ? <img src={inputValues[`${imageUsage}`] || ""} width="620" /> : null }
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