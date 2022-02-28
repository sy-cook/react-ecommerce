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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // If there is no userAuth (i.e., userAuth = `null`), return
  // Else, query firestore 
  if (!userAuth) return; 
  
  const userRef = firestore.doc(`users/${userAuth.uid}`); // documentReference

  const snapShot = await userRef.get(); // documentSnapshot

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

export const addCollectionandDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  // loop over objectsToAdd array
  // .forEach() does not return a new array, unlike with .map()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); // get a new document collection and randomly generate an id for it
    batch.set(newDocRef, obj); // instead of newDocRef.set() to batch the calls together
  });

  // fire off the batch call
  // returns a Promise, and if it succeeds, will resolve to a null value
  return await batch.commit()
};

// convert array to object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()), // pass it some string, and converts to characters that a URL can read
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection; // { hats: { ... }, jackets: { ... }, ... }
    return accumulator;
  }, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Use the GoogleAuthProvider pop-up for authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;