import { ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { useState, useRef, useContext } from 'react'
import { storage } from "../../../firebase.js"

import { PostsContext } from '../../../contexts/PostContext.js'
import { UserContext } from '../../../contexts/UserContext.js'
import { Grid, TextField, Box, Typography, Button, LinearProgress, Grow, Modal, ButtonBase } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { Upgrade } from '@mui/icons-material'


export default function PostImageInput({ imageUsage, oldUrl, category, postData }){

    const { inputValues, setInputValues } = useContext(UserContext)
    const { image, setImage, upgrade, setUpgrade } = useContext(PostsContext)
    const [ progress, setProgress ] = useState(0)
    const [ imageUrl, setImageUrl ] = useState()
    const img = useRef()

    console.log('PostImage',imageUsage)


 

    function fileHandler(e) {
        e.preventDefault()
        setImageUrl(URL.createObjectURL(img.current.files[0]))
        //console.log('URL.createObjectURL(img.current.files[0]', URL.createObjectURL(img.current.files[0]))
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
            getDownloadURL(uploadTask.snapshot.ref).then((imgURL)=> setImage({image: imgURL}))
        })
    }

    console.log('PostImage', image)




    // we need to fetch from the profile user to delete in real time 
    function deleteFile(file){
        if(file){
            const storage = getStorage()
            const imageRef = ref(storage, `/files/image/${imageUsage}`)

            deleteObject(imageRef).then(()=>{
                console.log('imageRef', img)
                setInputValues({...inputValues, [`${imageUsage}`]:""})
                setProgress(0)
                setImageUrl('')
                setImage('')
            }).catch((error)=>{
                console.log(error)
            })
        }
        if(postData.image){
            const storage = getStorage()
            const videoRef=ref(storage, `${postData.image}`)

            deleteObject(videoRef).then(()=>{
                setInputValues({...inputValues, [`${imageUsage}`]:""})
                setImageUrl('')
               
                
            }).catch((error)=>{
                console.log(error)
            })
            const url = `http://localhost:3000/${category}/${postData._id}`
            
            const payload={ "image" :"" }
            console.log(payload)
            const config ={ 
                method:"PATCH", 
                headers:{"Content-Type":"application/json"}, 
                body:JSON.stringify(payload)
            }
            fetch(url, config)
            .then(response=> response.json())
            .then(result => {
                setImage('')
                setImageUrl('')
               setUpgrade(!Upgrade)
                
            })
        }
        }    






    function LinearProgressWithLabel(props) {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }



    return(
        <div className="image">
            <div className="image-container">
                <img src={image.image || oldUrl} width="20%" 
                     style={{borderRadius:'5%'}}/> 
            </div>

            <section className="input-image" style={{marginTop: '2rem'}}>
                <label htmlFor="imageInput-input">
                    <input ref={img} type="file" accept="image/*" style={{display: 'none'}} id='imageInput-input' />
                    <Button variant="contained" endIcon={<ImageIcon />} size="large" component="span">
                        Choose file
                    </Button>
                </label>
                <Button type="submit" onClick={fileHandler} variant="outlined" size="large">Upload</Button>
                <Button onClick={deleteFile} variant="outlined" size="large">Delete</Button>
            </section>

            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>
        </div>
    )

}