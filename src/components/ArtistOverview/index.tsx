/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import * as React from 'react';
import { FunctionComponent } from 'react';
import { CenteredRow, CenteredLoadingComponent } from 'components/_general';
import Discography from 'components/Discography';
import Biography from 'components/Biography';
import { BaseComponentStyle } from './style';
import ArtistOverviewLogic from './ArtistOverviewLogic';

interface PropsType{
  musicbrainzID:string;
  style?:any;
  setAlbumBrowserProps: Function;
}
const Presentation : FunctionComponent<PropsType> = ({
  musicbrainzID,
  style,
  setAlbumBrowserProps,
}) => {
  const {
    albums, info, albumsIsLoading, infoIsLoading,
  } = ArtistOverviewLogic({ musicbrainzID });
  console.log("Rerendering artistoverview");
  return (
    <CenteredRow style={style}>
      <div style={{ ...BaseComponentStyle, maxWidth: 500 }}>

        {infoIsLoading && <CenteredLoadingComponent />}

        {!infoIsLoading && (
          <div>
            {info !== null && <h2>{info.name}</h2> }
            <Biography {...info.biography} loading={false} style={{ color: 'dimgrey' }} />
          </div>
        )}

      </div>
      <Discography
        style={BaseComponentStyle}
        albums={albums}
        loading={albumsIsLoading}
        onAlbumClick={(albumID: string) => setAlbumBrowserProps({ initialSelectedAlbumID: albumID, albums })}
      />
    </CenteredRow>
  );
};
Presentation.defaultProps = {
  style: {},
};
export default React.memo(Presentation);
