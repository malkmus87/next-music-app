/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent } from 'react';
import CenteredRow from 'components/_general/CenteredRow';

// interface CenteredComponentProps {
//   innerStyle:any;
//   style:any;
//   children:any;
// }

const CenteredComponent:FunctionComponent<any> = ({
  innerStyle,
  style,
  children,
  ...rest
}:any) => (
  <CenteredRow style={{ ...style }} {...rest}>
    <div style={{
      display: 'inline-block', verticalAlign: 'top', textAlign: 'left', ...innerStyle,
    }}
    >
      {children}
    </div>
  </CenteredRow>
);

export default CenteredComponent;
