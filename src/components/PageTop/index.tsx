/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { CenteredComponent, ListSearcherBetter } from 'components/_general';
import ArtistRequest from '../../resources/artist';
// SHOULD BE CENTEREDROW PROBABLY

interface PageTopPropsType{
    setFocusedElement:Function;
    focusedElement:string|null;
    setSelectedMusicbrainzID:Function;
    style?:any;
}

const PageTop:FunctionComponent<PageTopPropsType> = ({
  focusedElement,
  setFocusedElement,
  setSelectedMusicbrainzID,
  style,
}:PageTopPropsType) => {
  // const count = useAppSelector((state) => state.focusedElement.value);
  // const dispatch = useAppDispatch();

  const selectArtist : Function = (selectedArtist:any) => {
    setFocusedElement(null);
    setSelectedMusicbrainzID(selectedArtist.musicBrainzID);
  };

  const generateListOnInput : Function = async (input: string) => {
    const response = await ArtistRequest.search(input);

    if (response.status !== 200) throw new Error('Something went wrong');
    if (response.data.length === 0) throw new Error('No result matching filter');

    return response.data.slice(0, 10);
  };

  const listComponent:any = (artist:any) => (
    <div
      tabIndex={0}
      style={{
        padding: 10, width: 'calc(100% - 6px)', cursor: 'pointer', borderBottom: '2px black solid',
      }}
      role="none"
    >
      {artist.name}
    </div>
  ); // This is the component that is rendered in the filtered artist list

  return (
    <CenteredComponent
      onClick={() => setFocusedElement(null)}
      onKeyDown={():any => null}
      role="none"
      style={style}
    >
      <ListSearcherBetter
        onSubmit={selectArtist}
        listComponent={listComponent}
        setListOnInput={generateListOnInput}
      />
    </CenteredComponent>
  );
};

PageTop.defaultProps = {
  style: {},
};

export default PageTop;
