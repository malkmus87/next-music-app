/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
import { HoveredComponent } from 'components/_general';
import { Column } from '../../stylingComponents';

const myLoader = ({ src, width, quality }) => `${src}?w=${width}`;

interface ReleaseListProps {
  albums:Array<any>;
  onAlbumClick:Function;
}

const ReleaseWrapperStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  cursor: 'pointer',
};

const ReleaseListItem:FunctionComponent<any> = ({ album, onAlbumClick }:any) => (
  <div
    onClick={() => {
      onAlbumClick(album.musicBrainzID);
    }}
  >
    <Column
      style={{ width: 60 }}
    >
      {album.images.length > 0
        && (
          <Image
            loader={myLoader}
            src={album.images[0].source}
            alt=""
            width={40}
            height={40}
          />
        )}
    </Column>
    <Column style={{ width: 180, color: '#555555' }}>
      {album.title}
    </Column>
    <Column style={{ width: 80, fontFamily: 'Fira Code', fontSize: '13px' }}>
      {album.releaseDate}
    </Column>
  </div>
);

const ReleaseList:FunctionComponent<ReleaseListProps> = ({ albums, onAlbumClick }:ReleaseListProps) => {
  const itemStyle = useSpring({
    loop: false,
    from: { paddingTop: 0, paddingBottom: 0 },
    to: { paddingTop: 3, paddingBottom: 3 },
  });
  return (
    <div style={{ paddingTop: 5 }}>
      {albums.map((album:any, index:number) => (

        <animated.div
          key={index.toString()}
          style={{
            ...ReleaseWrapperStyle,
            background: index % 2 ? 'rgb(250, 250, 250)' : 'transparent',
            ...itemStyle,
          }}
        >
          <HoveredComponent
            style={{
              paddingTop: 0,
              marginBottom: 0,
              opacity: 1,
            }}
            styleOnHover={{
              paddingTop: 1,
              marginBottom: -1,
              opacity: 0.8,
            }}
          >
            <ReleaseListItem album={album} onAlbumClick={onAlbumClick} />
          </HoveredComponent>
        </animated.div>

      ))}
    </div>
  );
};

export { ReleaseListItem };
export default ReleaseList;
