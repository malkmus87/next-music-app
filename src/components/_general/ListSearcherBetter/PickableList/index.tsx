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
  onItemClick: Function;
}

const PickableList: FunctionComponent<PickableListPropsType> = ({
  selectableValues, listComponent, setFocusedIndex, focusedIndex, onItemClick,
}:PickableListPropsType) => (
  <>
    {selectableValues.map((selectableValue: any, index: number) => (
      React.cloneElement(listComponent(selectableValue), {
        onMouseOver: () => setFocusedIndex(index),
        onFocus: () => setFocusedIndex(index),
        onClick: () => onItemClick(selectableValue),
        style: {
          ...ListItemStyle,
          background: focusedIndex === index ? 'whitesmoke' : 'white',
        },
        'data-testid': `PickableListIndex${index.toString()}`,
      })
    ))}
  </>
);

export default PickableList;
