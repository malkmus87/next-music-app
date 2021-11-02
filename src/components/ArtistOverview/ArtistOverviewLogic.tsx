/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import AlbumRequest from 'resources/album';
import ArtistRequest from 'resources/artist';

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

  useEffect(() => {
    async function loadAlbums() {
      setAlbumsIsLoading(true);
      setAlbums(
        (await AlbumRequest.getAlbumsForArtistID(musicbrainzID)).data,
      );
      setAlbumsIsLoading(false);
    }

    async function loadInfo() {
      setInfoIsLoading(true);
      setInfo(
        (await ArtistRequest.getByID(musicbrainzID)).data,
      );
      setInfoIsLoading(false);
    }

    loadAlbums();
    loadInfo();
  }, [musicbrainzID]);

  return {
    albums, info, albumsIsLoading, infoIsLoading,
  };
};
export default ArtistOverviewLogic;
