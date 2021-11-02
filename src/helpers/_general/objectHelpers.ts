/* eslint-disable max-len */
// Might exist another way of doing this in javascript.
// The created reducer should be used on an array of keys and will generate a
// subset of an object with only the chosen keys

export const createSubsetOfObjectReducer = (object: any) => (accumulatedObject: any, currentKey: any) => ({
  ...accumulatedObject,
  [currentKey]: object[currentKey],
});

// INPUT  : Object that will be used for creating subset, and the keys to be included in the subset
// OUTPUT : Subset of object
export const createSubsetOfObject = (object: any, keys: any) => keys.reduce(createSubsetOfObjectReducer(object), {});

// INPUT  : Object it will be compared to and the keys we will compare
// OUTPUT : A function that can compare if two objects are equal for the chosen keys
export const isEqualTo = (keys: any, comparator: any) => (value: any) => {
  const array = keys.filter((key: any) => JSON.stringify(value[key]) === JSON.stringify(comparator[key]));
  return (
    keys.length > 0 && array.length === keys.length
  );
};
