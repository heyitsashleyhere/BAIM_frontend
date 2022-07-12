import { ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { useState, useRef, useContext } from 'react'
import { storage } from "../../../firebase.js"
import { PostsContext } from '../../../contexts/PostContext.js'
import { UserContext } from '../../../contexts/UserContext.js'
import { Grid, TextField, Box, Typography, Button, LinearProgress, Grow, Modal, ButtonBase } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';


export default function ImageInput({ imageUsage, oldUrl }){
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


    // we need to fetch from the profile user to delete in real time 
    function deleteFile(file){
        if(inputValues[`${imageUsage}`]){
            const storage = getStorage()
            const imageRef = ref(storage, `/files/image/${imageUsage}`)

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



    // console.log("checking image URL", inputValues[`${imageUsage}`])

    // I have to find more about this according to some research in the 


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
                <img src={inputValues[`${imageUsage}`] || oldUrl} width="30%" 
                     style={{borderRadius: imageUsage === 'image' ? '5%' : '50%'}}/> 
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