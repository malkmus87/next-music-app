/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Column, HoveredComponent } from 'components/_general';

interface PropsType{
  sortReleases: Function;
  sortSettings: any;
}

const sortButtonProps:any = ({
  style: {
    display: 'inline-block', cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none',
  },
  styleOnHover: { color: 'royalblue' },
});

const DiscographyTop:FunctionComponent<PropsType> = ({ sortReleases }:PropsType) => (
  <div style={{
    background: '#444444', borderStyle: 'solid', borderTop: '1px whitesmoke solid', padding: '2px 10px 2px 60px', fontWeight: 500, borderRadius: '2px 2px 5px 5px', fontSize: 15, color: 'ghostwhite', textShadow: '0 0 1px grey',
  }}
  >
    <Column style={{ width: 180 }}>
      <HoveredComponent {...sortButtonProps} onClick={() => sortReleases('title')}>
        Title
      </HoveredComponent>
    </Column>
    <Column style={{ width: 100 }}>
      <HoveredComponent {...sortButtonProps} onClick={() => sortReleases('releaseDate')}>
        Release date
      </HoveredComponent>
    </Column>
  </div>
);

export default DiscographyTop;
