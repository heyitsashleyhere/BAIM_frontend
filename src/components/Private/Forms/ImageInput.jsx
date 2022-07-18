import { ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { useState, useRef, useContext } from 'react'
import { storage } from "../../../firebase.js"
import { PostsContext } from '../../../contexts/PostContext.js'
import { UserContext } from '../../../contexts/UserContext.js'
import { Grid, TextField, Box, Typography, Button, LinearProgress, Grow, Modal, ButtonBase } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';


export default function ImageInput({ imageUsage, oldUrl, }){
    const { inputValues, setInputValues } = useContext(UserContext)
    const { image , setImage } =useContext(PostsContext)
    const [ progress, setProgress ] = useState(0)
    const [ imageUrl, setImageUrl ] = useState()
    const img = useRef()

    function uploadFile(file){
        if(!file){return}

        if(oldUrl){
            const storage = getStorage()
            const videoRef=ref(storage, `${oldUrl}`)

            deleteObject(videoRef).then(()=>{
                setImage('')
                setImageUrl('')
               
                
            }).catch((error)=>{
                console.log(error)
            })

            const storageRef= ref(storage,`/files/image/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file)
    
            uploadTask.on("state_changed", (snapshot)=>{
                const prog= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog)
            }, (err) => console.log("uploadFile error", err), 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((imgURL)=> {
                    if(imageUsage === "avatar"){
                        setInputValues({...inputValues, [`${imageUsage}`]: imgURL})
                        }else{
                            setImage({ image: imgURL })
                        }
                })
            })
        }

        const storageRef= ref(storage,`/files/image/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot)=>{
            const prog= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog)
        }, (err) => console.log("uploadFile error", err), 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((imgURL)=> {
                if(imageUsage === "avatar"){
                setInputValues({...inputValues, [`${imageUsage}`]: imgURL})
                }else{
                    setImage({ image: imgURL })
                }
            })
        })
    }

    function fileHandler(e) {
        e.preventDefault()
        setImageUrl(URL.createObjectURL(img.current.files[0]))
        const url = uploadFile(img.current.files[0])
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
            { image ?  
            <img src={ image.image } width="50" style={{borderRadius: imageUsage === 'image' ? '5%' : '50%'}}/> 
            : 
            <img src={inputValues[`${imageUsage}`] || oldUrl} width={ imageUsage === 'avatar' ? "30%" : '50%' } 
                     style={{borderRadius: imageUsage === 'image' ? '5%' : '50%'}}/> 
                     
            }
            </div>

            <section className="input-image" style={{marginTop: '2rem'}}>
                <label htmlFor="imageInput-input">
                    <input ref={img} type="file" accept="image/*" style={{display: 'none'}} id='imageInput-input' />
                    <Button variant="contained" endIcon={<ImageIcon />} size="large" component="span">
                        Choose file
                    </Button>
                </label>
                <Button type="submit" onClick={fileHandler} variant="outlined" size="large">Upload</Button>
               
            </section>

            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>
        </div>
    )

}