/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent } from 'react';
import CenteredRow from 'components/_general/CenteredRow';
import Column from 'components/_general/Column';
import styled from 'styled-components';

const CenteredComponent:FunctionComponent<any> = ({
  innerStyle,
  style,
  children,
  ...rest
}:any) => (
  <CenteredRow style={{ ...style }} {...rest}>
    <Column style={innerStyle}>
      {children}
    </Column>
  </CenteredRow>
);
const test = '';
export default CenteredComponent;
