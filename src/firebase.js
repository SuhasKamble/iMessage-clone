import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDB_51SAUxlxISkX_KwE0mhinchDYFkTY8",
    authDomain: "imessage-clone2.firebaseapp.com",
    databaseURL: "https://imessage-clone2.firebaseio.com",
    projectId: "imessage-clone2",
    storageBucket: "imessage-clone2.appspot.com",
    messagingSenderId: "191017629429",
    appId: "1:191017629429:web:a0fdaef43c78987b0f77bc",
    measurementId: "G-YCWXYT4YQC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider}
export default db;