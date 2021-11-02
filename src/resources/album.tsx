import { prepareListResponseFiner as prepareListResponse, prepareResponseFiner as prepareResponse } from '../helpers/prepareListResponse';
import JsonRequest from '../helpers/JsonRequestHandler';
// const JsonRequest = require('../helpers/JsonRequestHandler');

function setupAlbumRequest() {
  const albumRequest = JsonRequest({
    mainPath: 'http://localhost:5000/api/album',
    params: {
    },
  });
  return ({
    ...albumRequest,
    getAlbumsForArtistID: async (artistMusicbrainzID:string) => prepareListResponse({
      transform: (data:any) => data,
      response: await albumRequest.get(`forArtist/${artistMusicbrainzID}`, {}),
    }),
    getByID: async (musicbrainzID: string) => prepareResponse({
      transform: (data:any) => data,
      response: await albumRequest.get(`${musicbrainzID}`, {}),
      defaultValue: null,
    }),
  });
}
export default setupAlbumRequest();
