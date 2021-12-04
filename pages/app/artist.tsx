/* eslint-disable react/jsx-props-no-spreading */
import type { NextPage } from 'next';
import * as React from 'react';

import { CenteredComponent } from 'components/_general';
import ArtistOverview from 'components/ArtistOverview';
import AlbumBrowser from 'components/AlbumBrowser';
import { AlbumBrowserStyleProps, ArtistOverviewStyleProps, ContentStyle } from 'styles/mainComponents';

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
      innerStyle={ContentStyle}
    >
      {albumBrowserProps.initialSelectedAlbumID && (
        <AlbumBrowser
          {...albumBrowserProps}
          style={AlbumBrowserStyleProps}
          onLeave={clearAlbumProps}
        />
      )}
      {selectedMusicbrainzID && (
        <ArtistOverview
          musicbrainzID={selectedMusicbrainzID}
          style={ArtistOverviewStyleProps}
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
