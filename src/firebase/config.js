import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from 'firebase/auth'

// TEST DHEERAJ DATABASE

// const firebaseConfig = {
//   apiKey: "AIzaSyAyvssfa-L4ESkCeSxyOUYEH-l1fEWNXis",
//   authDomain: "testdheeraj.firebaseapp.com",
//   projectId: "testdheeraj",
//   storageBucket: "testdheeraj.appspot.com",
//   messagingSenderId: "272429665249",
//   appId: "1:272429665249:web:694e00a94004a8657aa0a0"
// };

// OLD PRODUCTION FIREBASE
// const firebaseConfig = {
//   apiKey: "AIzaSyBHaiIzN-yZqAt6limWhOhva4lxXffhfBg",
//   authDomain: "sunway-hub.firebaseapp.com",
//   projectId: "sunway-hub",
//   storageBucket: "sunway-hub.appspot.com",
//   messagingSenderId: "319117395648",
//   appId: "1:319117395648:web:e84d16af7b62e5fa464f25",
//   measurementId: "G-FGSSVCV817"
// };


// *********** New Production******************
const firebaseConfig = {
  apiKey: "AIzaSyCKKgtypyDx6JgCxbInun_LH092jMHNOuU",
  authDomain: "sunwayhub.firebaseapp.com",
  projectId: "sunwayhub",
  storageBucket: "sunwayhub.appspot.com",
  messagingSenderId: "460564337114",
  appId: "1:460564337114:web:4436663090bce0dd0470e3", 
  measurementId: "G-L2XB6PZL4J"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const FStorage = getStorage(app);
const projectAuth = getAuth();



export {db, FStorage, projectAuth}