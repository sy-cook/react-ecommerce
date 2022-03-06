import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
  // swtich our reducer's isFetching state
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  // Asynchronous action creator
  // function that we pass into our component to begin the asynch event handling process
  return dispatch => {
    // create the collectionRef, the snapShot reference of our collections array from Firestore
    const collectionRef = firestore.collection('collections');

    // dispatch the action `fetcCollectionsStart` call the moment fetchCollectionsStartAsync gets called
    // this will switch our reducer's `isFetching` state to `true`
    dispatch(fetchCollectionsStart());

    // make a API call to fetch back data associated with collectionRef,
    // then dispatch the success call once the asynchronous call resolves
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap))
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
  }
};
