import type { NextPage } from 'next';
import * as React from 'react';
import App from 'components/AppView';
import ArtistOverview from 'components/ArtistOverview';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from 'redux/store';
// import './index.css';
// import Wrapper from 'components/Wrapper';

const Main: NextPage = ({ id }: any) => (
  <ArtistOverview
    musicbrainzID={id}
    setAlbumBrowserProps={() => null}
  />
  // <App selectedMusicbrainzID={id} />
);

Main.getInitialProps = ({ query: { id } }) => ({ id });

Main.defaultProps = {
  id: null,
};

export default Main;
