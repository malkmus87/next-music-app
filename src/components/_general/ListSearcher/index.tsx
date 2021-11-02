/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import CenteredLoadingComponent from 'components/_general/CenteredLoadingComponent';
import { ListSearcherProps } from './types';
import PickableList from './PickableList';

const ListStyle:any = {
  background: 'white',
  width: 'calc(100% - 20px)',
  paddingLeft: 10,
  paddingRight: 10,
};

const ListSearcher: FunctionComponent<ListSearcherProps> = ({
  onChange,
  searchKey,
  label,
  onSubmit,
  selectableValues,
  listComponent,
  isLoading,
  isFocused,
  onTextFieldClick,
  style,
  ...rest
}:ListSearcherProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

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

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (isLoading) return;
      if (searchKey.length === 0) setErrorMessage('Missing input');
      else if (selectableValues.length === 0) setErrorMessage('No result matching filter');
      else {
        onSubmit(selectableValues[focusedIndex]);
        setErrorMessage('');
      }
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      goToNextIndex();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      goToPreviousIndex();
    }
  }
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    onChange(event.target.value);
  };
  useEffect(() => {
    setFocusedIndex(0);
    setErrorMessage('');
  }, [selectableValues]);
  return (
    <div style={style}>
      <div
        onKeyDown={onKeyDown}
        {...rest}
        role="none"
        data-testid="ListSearcher"
        style={{
          ...ListStyle,
          ...isFocused ? {
            borderWidth: '0 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: 'whitesmoke',
            paddingLeft: 19,
            paddingRight: 19,
          } : {},
        }}
      >
        <TextField
          data-testid="ListSearcherTextField"
          value={searchKey}
          onChange={onTextChange}
          onClick={(event) => {
            event.stopPropagation();
            onTextFieldClick();
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
        {errorMessage !== '' && <div style={{ color: 'coral' }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

ListSearcher.defaultProps = {
  label: 'Search',
  isLoading: false,
  style: {},
  isFocused: true,
  listComponent: (value:string) => <div>{value}</div>,
};

export default ListSearcher;
