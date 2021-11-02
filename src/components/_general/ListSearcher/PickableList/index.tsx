/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent } from 'react';

const ListItemStyle:any = {
  cursor: 'pointer',
  width: '100%',
  overflow: 'visible',
};

interface PickableListPropsType {
  selectableValues:Array<any>;
  listComponent: Function;
  setFocusedIndex: Function;
  focusedIndex: number;
}

const PickableList: FunctionComponent<PickableListPropsType> = ({
  selectableValues, listComponent, setFocusedIndex, focusedIndex,
}:PickableListPropsType) => (
  <>
    {selectableValues.map((selectableValue: any, index: number) => (
      React.cloneElement(listComponent(selectableValue), {
        onMouseOver: () => setFocusedIndex(index),
        onFocus: () => setFocusedIndex(index),
        style: {
          ...ListItemStyle,
          background: focusedIndex === index ? 'whitesmoke' : 'white',
        },
        'data-testid': `value${index.toString()}`,
      })
    ))}
  </>
);

export default PickableList;
