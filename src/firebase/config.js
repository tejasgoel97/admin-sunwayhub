import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAyvssfa-L4ESkCeSxyOUYEH-l1fEWNXis",
  authDomain: "testdheeraj.firebaseapp.com",
  projectId: "testdheeraj",
  storageBucket: "testdheeraj.appspot.com",
  messagingSenderId: "272429665249",
  appId: "1:272429665249:web:694e00a94004a8657aa0a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const FStorage = getStorage(app);
const projectAuth = getAuth();



export {db, FStorage, projectAuth}