/* eslint-disable react/jsx-props-no-spreading */
import type { NextPage } from 'next';
import * as React from 'react';

import { CenteredComponent } from 'components/_general';
import ArtistOverview from 'components/ArtistOverview';
import AlbumBrowser from 'components/AlbumBrowser';

// import { Provider } from 'react-redux';
// import store from 'redux/store';
// import './index.css';
// import Wrapper from 'components/Wrapper';

interface AlbumBrowserPropsType {
  initialSelectedAlbumID: string | null;
  albums: Array<any>;
}

const ArtistView: NextPage = React.memo(({ selectedMusicbrainzID }: any) => {
  const [albumBrowserProps, setAlbumBrowserProps] = React.useState<AlbumBrowserPropsType>({
    initialSelectedAlbumID: null,
    albums: [],
  });
  const clearAlbumProps : Function = () => {
    setAlbumBrowserProps({
      initialSelectedAlbumID: null,
      albums: [],
    });
  };

  return (
    <CenteredComponent
      innerStyle={{
        width: '100%',
        maxWidth: 1200,
      }}
    >
      {albumBrowserProps.initialSelectedAlbumID && (
        <AlbumBrowser
          {...albumBrowserProps}
          onLeave={clearAlbumProps}
        />
      )}
      {selectedMusicbrainzID && (
        <ArtistOverview
          musicbrainzID={selectedMusicbrainzID}
          setAlbumBrowserProps={setAlbumBrowserProps}
        />
      )}

    </CenteredComponent>
  );
});

ArtistView.getInitialProps = ({ query: { selectedMusicbrainzID } }) => ({ selectedMusicbrainzID });

ArtistView.defaultProps = {
  selectedMusicbrainzID: null,
};

export default ArtistView;
