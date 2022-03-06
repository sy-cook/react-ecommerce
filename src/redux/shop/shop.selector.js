import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key] ) : []  
  // map over the array of keys, if it exists (is not `null`)
);

export const selectCollection = collectionUrlParam => 
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);