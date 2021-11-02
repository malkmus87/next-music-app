/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { FunctionComponent } from 'react';
import LoadRequest from 'components/_hooks/LoadRequest';
import AlbumRequest from 'resources/album';
import { CenteredLoadingComponent } from 'components/_general';

interface AlbumViewWrapperPropsType {
  musicbrainzAlbumID: string;
}
const AlbumViewWrapper : FunctionComponent<AlbumViewWrapperPropsType> = ({ musicbrainzAlbumID } : AlbumViewWrapperPropsType) => {
  const { response, requestState } = LoadRequest({
    request: () => AlbumRequest.getByID(musicbrainzAlbumID),
    trigger: [musicbrainzAlbumID],
  });

  return (
    <div>
      {requestState === 'loading' && <CenteredLoadingComponent /> }
      {requestState === 'finished' && (
        <AlbumView {...response.data} />
      )}
      {requestState === 'failed' && <p>Failed fetching data</p>}
    </div>
  );
};

interface AlbumViewPropsType {
  disambiguation: string;
  discogsData: any;
  musicbrainzID: string;
  primaryType: string;
  relations: Array<any>;
  releaseDate: string;
  title: string;
}
const AlbumView: FunctionComponent<AlbumViewPropsType> = ({
  disambiguation,
  releaseDate,
  title,
  discogsData,
  musicbrainzID,
  primaryType,
  relations,
}:AlbumViewPropsType) => (
  <div>
    <h1>{title}</h1>
    <p>{disambiguation}</p>
    <p>{releaseDate}</p>
  </div>
);

export default AlbumViewWrapper;
