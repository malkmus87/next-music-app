import * as React from 'react';
import { useEffect, useState } from 'react';

interface PropsType {
  request: any;
  trigger: Array<string>;
}
// const requestStateReducer: Function = () => {

// };

const LoadRequest: Function = ({ request, trigger }: PropsType) => {
  const [response, setResponse] = useState<any>(null);
  const [requestState, setRequestState] = useState<string>('mounted');

  useEffect(() => {
    function handleResponse(receivedResponse: any) {
      setResponse(receivedResponse);
      if (receivedResponse.status >= 200 && receivedResponse.status < 300) setRequestState('finished');
      else setRequestState('failed');
    }
    async function runEffect() {
      setRequestState('loading');
      handleResponse(await request());
    }
    runEffect();
  }, trigger);

  return ({
    response,
    requestState,
  });
};

export default LoadRequest;
