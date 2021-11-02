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
    display: 'inline-block', cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none', color: 'black',
  },
  styleOnHover: { color: 'royalblue' },
});

const DiscographyTop:FunctionComponent<PropsType> = ({ sortReleases }:PropsType) => (
  <div style={{
    background: 'rgb(252,252,252)', borderStyle: 'solid', borderColor: 'whitesmoke', borderWidth: '1px', borderBottomWidth: '3px', borderTop: '1px whitesmoke solid', padding: '2px 10px 2px 60px', fontWeight: 550, borderRadius: '2px 2px 5px 5px', fontSize: 15,
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
