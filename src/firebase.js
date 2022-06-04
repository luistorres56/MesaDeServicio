import firebase from "firebase/app";
import app from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB7zNXlTbYnlavv9R6Em6wZuIaXWkpmRIE",
    authDomain: "mesadeservicio-11c34.firebaseapp.com",
    projectId: "mesadeservicio-11c34",
    storageBucket: "mesadeservicio-11c34.appspot.com",
    messagingSenderId: "69137952065",
    appId: "1:69137952065:web:2faacd09fcc883683b45c0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = app.firestore()
  const auth = app.auth()
  export {db,auth}