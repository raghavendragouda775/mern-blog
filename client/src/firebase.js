
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    // we use import.meta because of vite used in env file 
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-blog-ab092.firebaseapp.com",
  projectId: "mern-blog-ab092",
  storageBucket: "mern-blog-ab092.appspot.com",
  messagingSenderId: "612030268437",
  appId: "1:612030268437:web:2712fcf6223b2eb575ba1c"
};


export const app = initializeApp(firebaseConfig);