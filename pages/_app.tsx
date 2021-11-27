/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import PageTop from 'src/components/PageTop';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from 'redux/store';
import {
  AppBodyStyleProps, PageTopStyleProps,
} from 'components/AppView/style';
import { LegacyRef } from 'react';
import useScrollEventListener from 'components/_hooks/useScrollEventListener';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [focusedElement, setFocusedElement] = React.useState<string|null>(null);
  const ref : LegacyRef<HTMLDivElement> | undefined = React.createRef();
  const { scrollSettings } = useScrollEventListener({ ref });

  const goToArtist : Function = (musicbrainzID : string) => {
    router.push({
      pathname: '/app/artist',
      query: { selectedMusicbrainzID: musicbrainzID },
    });
  };
  return (
    <div suppressHydrationWarning onClick={() => setFocusedElement(null)} onKeyDown={() => null} role="none" style={AppBodyStyleProps} ref={ref}>
      <Provider store={store}>
        <PageTop
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
          setSelectedMusicbrainzID={goToArtist}
          style={PageTopStyleProps}
        />
        {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </Provider>
    </div>
  );
}

export default MyApp;
