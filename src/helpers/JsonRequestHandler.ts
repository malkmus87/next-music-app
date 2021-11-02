/* eslint-disable max-len */
const defaultObject = (object: any) => (typeof object === 'object' ? object : {});

const setResponseHandler = (handleResponse: Function) => (
  handleResponse !== undefined ? handleResponse : (response: any) => response
);

const setUrl = (url: string, params: any) => url + new URLSearchParams(params);

const combineParams = (parametersForThisRequest: any, params: any) => (
  { ...defaultObject(parametersForThisRequest), ...defaultObject(params) }
);

async function responseWrapper(url: string, options: any, handleResponse: Function = (response: any) => response) {
  try {
    return await setResponseHandler(handleResponse)(await fetch(url, options));
  } catch (error) {
    return { status: 500, body: null };
  }
}

const JsonRequest = ({
  mainPath, headers, handleResponse, params,
}:any) => {
  const options = {
    mainPath,

    headers: {
      'Content-Type': 'application/json',
      ...defaultObject(headers),
    },
  };

  return ({
    post: async (to: string, parametersForThisRequest: any) => responseWrapper(`${mainPath}/${to}`, {
      ...options, body: JSON.stringify(parametersForThisRequest.body), method: 'post',
    }),
    get: async (from: string, parametersForThisRequest: any) => responseWrapper(
      setUrl(`${mainPath}/${from}?`, combineParams(parametersForThisRequest, params)),
      { ...options, method: 'get' },
      handleResponse,
    ),
    getByID: async (from: string, parametersForThisRequest: any) => responseWrapper(
      setUrl(`${mainPath}/${from}?`, combineParams(parametersForThisRequest, params)), { ...options, method: 'get' }, handleResponse,
    ),
    deleteByParameters: async (from: string, parametersForThisRequest: any) => responseWrapper(
      setUrl(`${mainPath}/${from}?`, combineParams(parametersForThisRequest, params)),
      { ...options, method: 'delete' },
      handleResponse,
    ),
  });
};

export default JsonRequest;
