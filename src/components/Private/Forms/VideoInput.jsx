import { ref,uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { useState, useRef, useContext } from 'react'
import { storage } from "../../../firebase.js"
import { PostsContext } from '../../../contexts/PostContext.js'

import { Box, Typography, Button, LinearProgress } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';


export default function VideoInput({ oldUrl }){
    
    const { video, setVideo } =useContext(PostsContext)
    const [ progress, setProgress ] = useState(0)
    const [ videoUrl, setVideoUrl ] = useState()
    const media = useRef()



    function uploadFile(file){

        if(!file){return}
        if(oldUrl){
            const storage = getStorage()
            const videoRef = ref(storage, `${oldUrl}`)

            deleteObject(videoRef).then(()=>{
                setImage('')
                setImageUrl('')
               
                
            }).catch((error)=>{
                console.log(error)
            })

            const storageRef= ref(storage,`/files/video/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file)
    
            uploadTask.on("state_changed", (snapshot)=>{
                const prog= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog)
            }, (err) => console.log("uploadFile error", err), 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((imgURL)=> setVideo({ video: imgURL }))
            })
        
        }else{
        const storageRef = ref(storage, `/files/video/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
           
        }, (err) => console.log(err),
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) => setVideo({video: imgUrl}))
          }
         )
        }
    }

    function fileHandler(e) {
        // console.log(e)
        e.preventDefault()
        setVideoUrl(URL.createObjectURL(media.current.files[0]))
        // console.log('URL.createObjectURL(img.current.files[0]', URL.createObjectURL(img.current.files[0]))
        const url = uploadFile(media.current.files[0])
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
            { video.video ?
                <video src={video.video} width="50%" style={{ borderRadius: '5%' }} controls>
                    <source src={video.video} type="video/mp4"/>
                    <source src={video.video } type="video/webm"/>
                </video>
                :
                oldUrl && <video src={oldUrl} width="50%" style={{ borderRadius: '5%'}} />
            }
        </div>

        {/* <section className="input-image" style={{marginTop: '2rem'}}>
        
            <input ref={media} type="file" accept="video/*" className="input" />
            <button type="submit" onClick={fileHandler} variant="outlined" size="large">Upload</button>
           
        </section> */}

        <section className="input-image" style={{marginTop: '2rem'}}>
                <label htmlFor="videoInput-input">
                    <input ref={media} type="file" accept="video/*" style={{display: 'none'}} id='videoInput-input' />
                    <Button variant="contained" endIcon={<VideocamIcon />} size="large" component="span">
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
