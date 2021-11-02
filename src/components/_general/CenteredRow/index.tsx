/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent } from 'react';

interface CenteredRowProps{
  style?:any;
  children:any;
}

const CenteredRowBaseStyle = {
  width: '100%',
  display: 'block',
  textAlign: 'center',
};

const CenteredRow:FunctionComponent<CenteredRowProps> = ({
  style,
  children,
  ...rest
}:CenteredRowProps) => (
  <div
    style={{ ...CenteredRowBaseStyle, ...style }}
    {...rest}
  >
    {children}
  </div>
);

CenteredRow.defaultProps = { style: {} };

export default CenteredRow;
