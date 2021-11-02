/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent } from 'react';

const Column:FunctionComponent<any> = ({ style, children, ...rest }:any) => (
  <div style={{ display: 'inline-block', verticalAlign: 'top', ...style }} {...rest}>
    {children}
  </div>
);
Column.defaultProps = {
  style: {},
};
export default Column;
