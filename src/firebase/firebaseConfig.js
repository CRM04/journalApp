import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyCs6fNMdFsUVcLbKRsZoWKMK-7bkPnK1gQ",
    authDomain: "reactjournalapp-f24b1.firebaseapp.com",
    projectId: "reactjournalapp-f24b1",
    storageBucket: "reactjournalapp-f24b1.appspot.com",
    messagingSenderId: "397442267243",
    appId: "1:397442267243:web:8606bf3c354d2c6c55992e",
    measurementId: "G-7BM23VG163"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export {
    db, googleAuth, firebase
}