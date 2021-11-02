/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent, useState } from 'react';

function defaultStyle(style:any) {
  return (typeof style === 'object' ? style : {});
}

interface CenteredRowProps{
    style?:any;
    children:any;
}

const CenteredRow:FunctionComponent<CenteredRowProps> = ({
  style,
  children,
  ...rest
}:CenteredRowProps) => (
  <div
    style={{
      width: '100%', ...defaultStyle(style), display: 'block', textAlign: 'center',
    }}
    {...rest}
  >
    {children}
  </div>
);
CenteredRow.defaultProps = { style: {} };

const CenteredComponent:FunctionComponent<any> = ({
  innerStyle,
  style,
  children,
  ...rest
}:any) => (
  <CenteredRow style={{ ...style }} {...rest}>
    <div style={{ display: 'inline-block', ...defaultStyle(innerStyle) }}>{children}</div>
  </CenteredRow>
);

CenteredComponent.defaultProps = { style: {}, innerStyle: {} };

const Column:FunctionComponent<any> = ({ style, children, ...rest }:any) => (
  <div style={{ display: 'inline-block', verticalAlign: 'top', ...defaultStyle(style) }} {...rest}>
    {children}
  </div>
);

Column.defaultProps = {
  style: {},
};

const HoveredComponent:FunctionComponent<any> = ({
  style, children, styleOnHover, ...rest
}:any) => {
  const [usedStyle, setUsedStyle] = useState(style);
  return (
    <div
      style={usedStyle}
      {...rest}
      onFocus={() => null}
      onMouseOver={() => setUsedStyle({ ...style, ...styleOnHover })}
      onMouseLeave={() => setUsedStyle(style)}
    >
      {children}
    </div>
  );
};
export {
  CenteredRow, CenteredComponent, Column, HoveredComponent,
};
