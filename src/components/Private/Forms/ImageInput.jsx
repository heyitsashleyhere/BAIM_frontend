import { ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { useState, useRef, useContext } from 'react'
import { storage } from "../../../firebase.js"
import { PostsContext } from '../../../contexts/PostContext.js'
import { UserContext } from '../../../contexts/UserContext.js'
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';


export default function ImageInput({ imageUsage, oldUrl, }){
    const { inputValues, setInputValues } = useContext(UserContext)
    const { image , setImage } =useContext(PostsContext)
    const [ progress, setProgress ] = useState(0)
    const [ imageUrl, setImageUrl ] = useState()
    const img = useRef()

    function uploadFile(file){
        if(!file){return}

        if(!oldUrl || !oldUrl.includes('firebase') || oldUrl.includes('2FLOKA2.jpg')){
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
        }else {
            const storage = getStorage()
            const imageRef = ref(storage, `${oldUrl}`)

            deleteObject(imageRef).then(()=>{
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
                { image.image ?

                    <img src={image.image} width="50%" style={{ borderRadius: imageUsage === 'image' ? '5%' : '50%' }} />
                    :
                    inputValues[`${imageUsage}`] || oldUrl ?
                     <img src={inputValues[`${imageUsage}`] || oldUrl} width={imageUsage === 'avatar' ? "20%" : '40%'} style={{ borderRadius: imageUsage === 'image' ? '5%' : '50%' }} /> 
                     : null
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