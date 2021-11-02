import * as React from 'react';
import { FunctionComponent } from 'react';
import ReactLoading from 'react-loading';
import CenteredComponent from 'components/_general/CenteredComponent';

interface PropsType {
  width?:string;
  height?:string;
  color?:string;
}

const CenteredLoadingComponent:FunctionComponent<PropsType> = ({
  width,
  height,
  color,
}:PropsType) => (
  <CenteredComponent>
    <ReactLoading width={width} height={height} color={color} />
  </CenteredComponent>
);

CenteredLoadingComponent.defaultProps = {
  width: '30px',
  height: '15px',
  color: 'black',
};

export default CenteredLoadingComponent;
