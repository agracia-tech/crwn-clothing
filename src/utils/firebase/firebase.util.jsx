// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf6woVelXkLuC5BZSkPztgQHSl9pIpkDg",
  authDomain: "crwn-clothing-db-c21f6.firebaseapp.com",
  projectId: "crwn-clothing-db-c21f6",
  storageBucket: "crwn-clothing-db-c21f6.appspot.com",
  messagingSenderId: "902471077116",
  appId: "1:902471077116:web:8315e880b76de7cb8e5b79",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAUth,
  additionalInformation = {}
) => {
  if (!userAUth) return;
  const userDocRef = doc(db, "users", userAUth.uid);

  const userSnapShot = await getDoc(userDocRef);

  //if user data does not exist
  //create / set the document with the data from userAuth in collection

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAUth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating a user", error.message);
    }
  }
  //check if user data exist
  return userDocRef;
};

export const createAutUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
