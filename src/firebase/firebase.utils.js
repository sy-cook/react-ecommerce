import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBVJABdMzgo1gSLQWE4wpWvArnnHDgXqhs",
  authDomain: "react-ecommerce-e37f8.firebaseapp.com",
  projectId: "react-ecommerce-e37f8",
  storageBucket: "react-ecommerce-e37f8.appspot.com",
  messagingSenderId: "682965933882",
  appId: "1:682965933882:web:d5f23c0cce0286b4c87a03",
  measurementId: "G-Y5JNWZBK1Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // If there is no userAuth (i.e., userAuth = `null`), return

  // If userAuth exists, query firestore 

  // documentReference:
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  // documentSnapshot:
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    // If the user doesn't exist, create a new user using the data from userAuth
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // Return userRef, because there is a chance we want to use userRef to do other things.
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Use the GoogleAuthProvider pop-up for authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;