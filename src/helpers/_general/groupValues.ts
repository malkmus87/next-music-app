/* eslint-disable max-len */
import { isEqualTo, createSubsetOfObject } from './objectHelpers';
import { addToComponents } from './arrayHelpers';

export const removeKeysFromObject = (object:any, removedKeys:any) => {
  const remainingKeys = Object.keys(object).filter((key: any) => !removedKeys.includes(key));
  return createSubsetOfObject(object, remainingKeys);
};

export const createGroupingReducerOld = (keys: Array<any>) => (generatedValue: any, currentValue: any) => {
  const COMPARATOR = createSubsetOfObject(currentValue, keys);
  const EXISTING_INDEX = generatedValue.findIndex(isEqualTo(keys, COMPARATOR));
  const NEW_VALUES = EXISTING_INDEX > -1 ? [] : [{ ...COMPARATOR, components: [removeKeysFromObject(currentValue, keys)] }];
  return (
    [...generatedValue.map(addToComponents(removeKeysFromObject(currentValue, keys), EXISTING_INDEX)), ...NEW_VALUES]
  );
};

export const createGroupingReducer = (equalityStatement: Function, keys: Array<any>) => (generatedValue: any, currentValue: any) => {
  const transportedObject = createSubsetOfObject(currentValue, keys);
  const isEqual = (value: any) => equalityStatement(currentValue) === equalityStatement(value);
  const EXISTING_INDEX = generatedValue.findIndex(isEqual);
  const NEW_VALUES = EXISTING_INDEX > -1 ? [] : [{ ...transportedObject, components: [removeKeysFromObject(currentValue, keys)] }];
  return (
    [...generatedValue.map(addToComponents(removeKeysFromObject(currentValue, keys), EXISTING_INDEX)), ...NEW_VALUES]
  );
};

interface GroupValuesPropsType {
  comparator:Function;
  values:Array<any>;
  transportedKeys:Array<string>;
}

export function groupValues({ comparator, values, transportedKeys }:GroupValuesPropsType) {
  const GROUPING_REDUCER = createGroupingReducer(comparator, transportedKeys !== undefined ? transportedKeys : []);
  return values.reduce(GROUPING_REDUCER, []);
}

export default groupValues;
