/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { CenteredLoadingComponent } from 'components/_general';
import ReleaseList from './ReleaseList';
import DiscographyTop from './DiscographyTop';

interface PropsType {
  albums:Array<any>;
  loading:boolean;
  onAlbumClick:Function;
  style?:any;
}

interface SortSettingsType {
  key: string | null;
  direction: number;
}

function sorter({ a, b, type }:any) {
  if (type === 'number') return b - a;
  return (
    -(a > b)
    || +(a < b)
  );
}

const Discography:FunctionComponent<PropsType> = ({
  albums, loading, style, onAlbumClick,
}:PropsType) => {
  // These two hooks are always connected, might convert this to one hook
  const [sortedReleases, setSortedReleases] = useState<Array<any>>([]);
  const [sortSettings, setSortSettings] = useState<SortSettingsType>({ key: null, direction: -1 });

  const sortReleases : Function = (sortKey:string) => {
    const tempSortedReleases = [...sortedReleases];
    const sortDirection : number = (sortSettings.key === sortKey ? -1 : 1)
      * (sortSettings.direction);
    tempSortedReleases.sort((a, b) => sortDirection * sorter({ a: a[sortKey], b: b[sortKey], type: 'string' }));
    setSortedReleases(tempSortedReleases);
    setSortSettings({ key: sortKey, direction: sortDirection });
  };

  useEffect(() => {
    setSortedReleases([...albums]);
  }, [albums]);

  return (
    <div style={style}>
      <DiscographyTop sortReleases={sortReleases} sortSettings={sortSettings} />
      {!loading ? <ReleaseList albums={sortedReleases} onAlbumClick={onAlbumClick} />
        : <CenteredLoadingComponent />}
    </div>
  );
};

Discography.defaultProps = {
  style: {},
  // onAlbumClick: () => null,
};

export default Discography;
