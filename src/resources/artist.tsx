import { prepareListResponseFiner as prepareListResponse, prepareResponseFiner as prepareResponse } from '../helpers/prepareListResponse';
import JsonRequest from '../helpers/JsonRequestHandler';
// const JsonRequest = require('../helpers/JsonRequestHandler');

function setupArtistRequest() {
  const artistRequest = JsonRequest({
    mainPath: 'http://localhost:5000/api/artist',
    params: {
    },
  });
  return ({
    ...artistRequest,
    search: async (name:string) => prepareListResponse({
      transform: (data:any) => data,
      response: await artistRequest.get('search', { name }),
    }),
    getByID: async (id:string) => prepareResponse({
      transform: (data:any) => data,
      response: await artistRequest.get(`${id}`, {}),
    }),
  });
}

export default setupArtistRequest();
