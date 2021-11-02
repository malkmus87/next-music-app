/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Route } from 'react-router-dom';
import PageTop from 'components/PageTop';
import ArtistOverview from 'components/ArtistOverview';
import AlbumBrowser from 'components/AlbumBrowser';
import CenteredComponent from 'components/_general/CenteredComponent';
import { useRouter } from 'next/router';
import {
  AppBodyStyleProps, PageTopStyleProps, ArtistOverviewStyleProps, AlbumOverviewStyleProps,
} from './style';

interface AlbumBrowserPropsType {
  initialSelectedAlbumID: string | null;
  albums: Array<any>;
}
interface AppPropsType {
  selectedMusicbrainzID: string;
}

const App:FunctionComponent<AppPropsType> = ({ selectedMusicbrainzID } : AppPropsType) => {
  // const [selectedMusicbrainzID, setSelectedMusicbrainzID] = useState<string|null>(null);
  const [focusedElement, setFocusedElement] = useState<string|null>(null);
  const router = useRouter();
  const goToArtist : Function = (musicbrainzID : string) => {
    router.push({
      pathname: '/app/artist',
      query: { id: musicbrainzID },
    });
    // history.push(`${musicbrainzID}`);
    // setSelectedMusicbrainzID(musicbrainzID);
  };
  const [albumBrowserProps, setAlbumBrowserProps] = useState<AlbumBrowserPropsType>({
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
    <div
      style={AppBodyStyleProps}
      role="none"
      tabIndex={-1}
      onKeyDown={(event:any) => {
        if (event.key === 'Escape') clearAlbumProps();
      }}
      onClick={() => setFocusedElement(null)}
    >
      <PageTop
        focusedElement={focusedElement}
        setFocusedElement={setFocusedElement}
        setSelectedMusicbrainzID={goToArtist}
        style={PageTopStyleProps}
      />
      <MainView
        albumBrowserProps={albumBrowserProps}
        setFocusedElement={() => null}
        selectedMusicbrainzID={selectedMusicbrainzID}
        setAlbumBrowserProps={setAlbumBrowserProps}
        clearAlbumProps={clearAlbumProps}
        // match={match}
      />
    </div>

  );
};

interface MainViewProps {
    selectedMusicbrainzID: string | null;
    setFocusedElement: Function;
    albumBrowserProps: AlbumBrowserPropsType;
    clearAlbumProps: Function;
    setAlbumBrowserProps: Function;
    // match:any;
}
const MainView : FunctionComponent<MainViewProps> = ({
  selectedMusicbrainzID,
  setFocusedElement,
  albumBrowserProps,
  clearAlbumProps,
  setAlbumBrowserProps,
}:MainViewProps) => (
  // <Route
  //   path={`${match.path}/${selectedMusicbrainzID}`}
  //   render={() => (
      <CenteredComponent
        onClick={() => setFocusedElement(null)}
        role="none"
        innerStyle={{
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {albumBrowserProps.initialSelectedAlbumID && (
        <AlbumBrowser
          {...albumBrowserProps}
          onLeave={clearAlbumProps}
          style={AlbumOverviewStyleProps}
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
    // )}
  // />
);
export default App;
