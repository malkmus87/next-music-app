/* eslint-disable max-len */
export const addToComponents = (currentValue: any, selectedIndex: number) => (value: any, index: number) => (index === selectedIndex
  ? { ...value, components: [...value.components, currentValue] } : value);
export const updateValue = (currentValue: any, selectedIndex: number) => (value: any, index: number) => (index === selectedIndex
  ? { ...value, currentValue } : value);
