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


 const app = initializeApp(firebaseConfig)
 const storage = getStorage(app)

 export { app, storage }