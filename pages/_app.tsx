/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageTop from 'components/PageTop';
import { useRouter } from 'next/router';
import {
  AppBodyStyleProps, PageTopStyleProps, ArtistOverviewStyleProps, AlbumOverviewStyleProps,
} from 'components/AppView/style';
import { LegacyRef } from 'react';

interface ScrollSettings {
  position: number;
  lastDirection: string | null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [focusedElement, setFocusedElement] = React.useState<string|null>(null);
  const ref : LegacyRef<HTMLDivElement> | undefined = React.createRef();
  const [scrollSettings, setScrollSettings] = React.useState<ScrollSettings>({
    position: 0,
    lastDirection: null,
  });
  const goToArtist : Function = (musicbrainzID : string) => {
    router.push({
      pathname: '/app/artist',
      query: { id: musicbrainzID },
    });
    // history.push(`${musicbrainzID}`);
    // setSelectedMusicbrainzID(musicbrainzID);
  };
  React.useEffect(() => {
    function updateScrollSettings(event: any) {
      setScrollSettings({
        position: event.target.scrollTop,
        lastDirection: event.target.scrollTop > scrollSettings.position ? 'up' : 'down',
      });
      console.log("Test");
    }
    if (ref && ref.current) {
      ref.current.addEventListener('scroll', updateScrollSettings, false);
    }
  }, []);
  // console.log(scrollSettings);
  return (
    <div suppressHydrationWarning onClick={() => setFocusedElement(null)} onKeyDown={() => null} role="none" style={AppBodyStyleProps} ref={ref}>
      <PageTop
        focusedElement={focusedElement}
        setFocusedElement={setFocusedElement}
        setSelectedMusicbrainzID={goToArtist}
        style={PageTopStyleProps}
      />
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
