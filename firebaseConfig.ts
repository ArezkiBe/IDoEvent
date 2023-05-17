import { getAuth  } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { getStorage } from 'firebase/storage';
//import auth from 'firebase/auth';
import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json"



const firebaseConfig = {
    apiKey: "AIzaSyBp4dSK2q4SxGk8xyBZFzMyTG9AZ7ijNxM",

    authDomain: "idoevent-66a5e.firebaseapp.com",

    projectId: "idoevent-66a5e",

    storageBucket: "idoevent-66a5e.appspot.com",

    messagingSenderId: "913363560585",

    appId: "1:913363560585:web:e9f4829516dd64d8403e58",

    measurementId: "G-8XDRGEN7R9"
  };

const fb = firebase.initializeApp(firebaseConfig)
/*admin.initializeApp({
  credential : admin.credential.cert({
    privateKey : serviceAccount.private_key,
    projectId : serviceAccount.project_id,
    clientEmail : serviceAccount.client_email
  })
})*/


const auth = getAuth(fb)

const storage = getStorage(fb)



export {auth, storage, firebase}
