import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAarQ6Yt1jfp_Yen-plFiWiAeAaMOSpWm8",
  authDomain: "filmyverse-16a74.firebaseapp.com",
  projectId: "filmyverse-16a74",
  storageBucket: "filmyverse-16a74.appspot.com",
  messagingSenderId: "332928856434",
  appId: "1:332928856434:web:c65ef80fa4b4501ebaedeb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef = collection(db, "movies")
export const reviewsRef = collection(db, "reviews")

export default app