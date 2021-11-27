/* eslint-disable max-len */
import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import ListSearcher from '../../components/_general/ListSearcher';

interface PropsType {
  values:Array<any>;
}

const ListSearcherTestWrapper: FunctionComponent<PropsType> = ({ values }:PropsType) => {
  const [selectableValues, setSelectableValues] = useState<Array<any>>([]);
  const [searchKey, setSearchKey] = useState('');
  const onChange = (newSearchKey:any) => {
    setSearchKey(newSearchKey);
    setSelectableValues(selectableValues.filter((value) => value.name.includes(searchKey))); // This does not really need to be this complex. I
    // setSelectableValues([{ name: 'Sebbe' }]); // I think this is the only thing that is needed
  };
  useEffect(() => {
    setSelectableValues(values);
    setSearchKey('Start-text');
  }, [values]);
  return (
    <ListSearcher
      label="Sök"
      onChange={onChange}
      listComponent={(value:any) => <div key={value.id}>{value.name}</div>}
      searchKey={searchKey}
      onSubmit={() => null}
      selectableValues={selectableValues}
      onTextFieldClick={():any => null}
    />
  );
};

export default ListSearcherTestWrapper;
