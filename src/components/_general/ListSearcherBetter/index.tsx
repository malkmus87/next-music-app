/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CenteredLoadingComponent from 'components/_general/CenteredLoadingComponent';
import { ListSearcherProps } from './types';
import PickableList from './PickableList';
import { ListDefaultStyle, ListFocusedStyle } from './style';

const ListSearcherBetter: FunctionComponent<ListSearcherProps> = ({
  setListOnInput,
  label,
  onSubmit,
  listComponent,
  isFocused,
  onTextFieldClick,
  style,
  ...rest
}:ListSearcherProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectableValues, setSelectableValues] = useState<Array<any>>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeoutID, setTimeoutID] = useState<any>();

  function goToNextIndex() {
    setFocusedIndex((currentIndex:number) => (
      currentIndex >= selectableValues.length - 1 ? 0 : currentIndex + 1
    ));
  }
  function goToPreviousIndex() {
    setFocusedIndex((currentIndex:number) => (
      currentIndex <= 0 ? selectableValues.length - 1 : currentIndex - 1
    ));
  }
  function onEnterPress() {
    if (isLoading) return;
    if (searchKey.length === 0) setErrorMessage('Missing input');
    else if (selectableValues.length === 0) setErrorMessage('No items');
    else {
      onSubmit(selectableValues[focusedIndex]);
      setErrorMessage('');
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        onEnterPress();
        break;
      case 'ArrowDown':
        event.preventDefault();
        goToNextIndex();
        break;
      case 'ArrowUp':
        event.preventDefault();
        goToPreviousIndex();
        break;
      default:
        break;
    }
  }
  async function updateList(newSearchKey: string) {
    setIsLoading(true);
    try {
      setSelectableValues((await setListOnInput(newSearchKey)));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSelectableValues([]);
        setErrorMessage(error.message);
      }
      console.log(error);
    }
    setIsLoading(false);
  }
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    clearTimeout(timeoutID);
    setSearchKey(event.target.value);
    if (event.target.value === '') setSelectableValues([]);
    else {
      const newTimeoutID = setTimeout(async () => {
        await updateList(event.target.value);
      }, 500);
      setTimeoutID(newTimeoutID);
    }
    setFocusedIndex(0);
  };
  return (
    <div style={style}>
      <div
        onKeyDown={onKeyDown}
        {...rest}
        role="none"
        data-testid="ListSearcher"
        style={{
          ...ListDefaultStyle,
          ...isFocused ? ListFocusedStyle : {},
        }}
      >
        <TextField
          data-testid="ListSearcherTextField"
          value={searchKey}
          onChange={onTextChange}
          onClick={(event) => {
            event.stopPropagation();
            if (onTextFieldClick !== undefined) onTextFieldClick();
          }}
          style={{ width: '100%' }}
          label={label}
          inputProps={{
            'data-testid': 'ListSearcherTextFieldInput',
          }}
        />

        {isFocused && (
        <div>
          {isLoading
            ? <CenteredLoadingComponent />
            : (
              <PickableList
                setFocusedIndex={setFocusedIndex}
                focusedIndex={focusedIndex}
                selectableValues={selectableValues}
                listComponent={listComponent}
              />
            )}
        </div>
        )}
        {isFocused && errorMessage !== '' && <div style={{ color: 'coral' }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

ListSearcherBetter.defaultProps = {
  label: 'Search',
  style: {},
  isFocused: true,
  listComponent: (value:string) => <div>{value}</div>,
  onTextFieldClick: () => null,
};

export default ListSearcherBetter;
