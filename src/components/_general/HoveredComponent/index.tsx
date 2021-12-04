/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface HoveredComponentProps {
  style:any;
  children:any;
  styleOnHover:any;
}

const convertToToggledSpringStyle: Function = ({ style, activeStyle, isToggledOn }:any) => {
  const stylesToCombine = Object.keys(style).map((key: string) => ({ [key]: isToggledOn && activeStyle[key] !== undefined ? activeStyle[key] : style[key] }));
  return stylesToCombine.reduce((accumulatedValue: any, currentValue: any) => ({
    ...accumulatedValue,
    ...currentValue,
  }));
};

const HoveredComponent:FunctionComponent<HoveredComponentProps> = ({
  style, children, styleOnHover, ...rest
}:HoveredComponentProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const springStyle = useSpring({
    to: convertToToggledSpringStyle({
      activeStyle: styleOnHover,
      style,
      isToggledOn: isHovered,
    }),
    delay: 0,
    config: {
      mass: 1, tension: 500, friction: 0, clamp: true,
    },
  });

  return (
    <animated.div
      style={springStyle}
      {...rest}
      onFocus={() => null}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.div>
  );
};

export default HoveredComponent;
