/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { useEffect, useState } from 'react';
import AlbumRequest from 'resources/album';
import ArtistRequest from 'resources/artist';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { addData as addCachedInfo } from 'redux/slices/cachedArtistInfoSlice';
import { addData as addCachedAlbums } from 'redux/slices/cachedArtistAlbumsSlice';

interface PropsType{
  musicbrainzID:string;
  style?:any;
}
interface Album{
  name: string;
}

const ArtistOverviewLogic:Function = ({ musicbrainzID }:PropsType) => {
  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [info, setInfo] = useState<any>({});
  const [albumsIsLoading, setAlbumsIsLoading] = useState<boolean>(false);
  const [infoIsLoading, setInfoIsLoading] = useState<boolean>(false);
  const dispatch = React.useCallback(useAppDispatch(), []);
  const cachedArtistData : Array<any> = useAppSelector((state) => state.cachedArtistInfo.value);
  const cachedArtistAlbums : Array<any> = useAppSelector((state) => state.cachedArtistAlbums.value);
  useEffect(() => {
    console.log("Running fetch artist effect");
    async function loadAlbums() {
      setAlbumsIsLoading(true);
      const cachedArtistAlbumsIndex = cachedArtistAlbums.findIndex((artistInfo: any) => (
        artistInfo.musicbrainzID === musicbrainzID
      ));
      const artistAlbums = (cachedArtistAlbumsIndex > -1) ?
        cachedArtistAlbums[cachedArtistAlbumsIndex].albums : (await AlbumRequest.getAlbumsForArtistID(musicbrainzID)).data
      ;
      setAlbums(artistAlbums);
      dispatch(addCachedAlbums({ musicbrainzID, albums: artistAlbums }));
      setAlbumsIsLoading(false);
    }

    async function loadInfo() {
      setInfoIsLoading(true);
      const cachedArtistDataIndex = cachedArtistData.findIndex((artistData: any) => (
        artistData.musicbrainzID === musicbrainzID
      ));
      const artistData = (cachedArtistDataIndex > -1) ?
        cachedArtistData[cachedArtistDataIndex] : (await ArtistRequest.getByID(musicbrainzID)).data
      ;
      setInfo(artistData);
      dispatch(addCachedInfo(artistData));
      setInfoIsLoading(false);
    }
    loadAlbums();
    loadInfo();
    // return () => {
    //   console.log("Artistoverview unmounted");
    // };
  }, [musicbrainzID, cachedArtistData, dispatch]);

  return {
    albums, info, albumsIsLoading, infoIsLoading,
  };
};
export default ArtistOverviewLogic;
