import {initializeApp } from 'firebase/app'
import { getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: process.env.APP_API_KEY,
    authDomain: process.env.APP_AUTH_DOMAIN,
    projectId: process.env.APP_PROJECT_ID,
    storageBucket: process.env.APP_STORAGE_BUCKET,
    messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.APP_MEASUREMENT_ID
  };

  // const firebaseConfig = {
  //   apiKey: "AIzaSyBmQbtA3HMB3cpT_DfeOL9dNhGxG-Z76A0",
  //   authDomain: "baimimages.firebaseapp.com",
  //   projectId: "baimimages",
  //   storageBucket: "baimimages.appspot.com",
  //   messagingSenderId: "901761608830",
  //   appId: "1:901761608830:web:e6412e01b9b99dfdd03c2f",
  //   measurementId: "G-39B6B66DS7"
  // };


 const app = initializeApp(firebaseConfig)
 const storage = getStorage(app)

 export { app, storage }