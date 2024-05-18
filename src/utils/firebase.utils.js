import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9Eu_L5dyiC99dVigbx-pG1Tz15rCCxG4",
  authDomain: "pokequiz-7cacc.firebaseapp.com",
  databaseURL: "https://pokequiz-7cacc-default-rtdb.firebaseio.com",
  projectId: "pokequiz-7cacc",
  storageBucket: "pokequiz-7cacc.appspot.com",
  messagingSenderId: "869634958680",
  appId: "1:869634958680:web:4b1e583a6f0a2c1d02712d",
  measurementId: "G-CVGZF2R01K"
};

const provider = new GoogleAuthProvider();
  
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const signOutUserApp = () => signOut(auth);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);