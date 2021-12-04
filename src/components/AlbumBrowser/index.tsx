/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import AlbumViewWrapper from 'components/AlbumOverview';

interface PropsType {
  initialSelectedAlbumID: string | null;
  onLeave: Function;
  style?: any;
  albums?: Array<any>;
}

const AlbumOverviewInnerStyleBase = {
  background: 'whitesmoke',
  height: '100vh',
  padding: 20,
};

const AlbumBrowser : FunctionComponent<PropsType> = ({
  initialSelectedAlbumID,
  onLeave,
  style,
}:PropsType) => {
  const [selectedAlbumID, setSelectedAlbumID] = useState<string | null>(null);
  useEffect(() => {
    setSelectedAlbumID(initialSelectedAlbumID);
  }, [initialSelectedAlbumID]); // Set default selection on new props

  const viewStyle = useSpring({
    loop: false,
    from: { marginLeft: '50vh' },
    to: { marginLeft: '0vh' },
  });

  return (
    <div style={style}>
      <animated.div
        style={{ ...AlbumOverviewInnerStyleBase, ...viewStyle }}
      >
        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            onClick={() => onLeave()}
          >
            Lämna
          </button>
        </div>
        {selectedAlbumID !== null && (
          <AlbumViewWrapper
            musicbrainzAlbumID={selectedAlbumID}
          />
        )}
      </animated.div>
    </div>
  );
};

AlbumBrowser.defaultProps = {
  style: {},
  albums: [],
};

export default AlbumBrowser;
