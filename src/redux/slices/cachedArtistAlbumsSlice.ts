/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const MAXIMUM_NUMBER_OF_CACHED_ARTISTS = 5;
const cachedArtistAlbumsSlice = createSlice({
  name: 'cachedArtistAlbums',
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state:any, action: PayloadAction<any | null>) => {
      const artistAlbumsShouldBeAdded = (
        state.value.findIndex((artistData: any) => (
          artistData.musicbrainzID === action.payload.musicbrainzID
        )) < 0
      );
      if (artistAlbumsShouldBeAdded) {
        if (state.value.length >= MAXIMUM_NUMBER_OF_CACHED_ARTISTS) state.value.shift();
        state.value.push(action.payload);
      }
    },
  },
});

export const { addData } = cachedArtistAlbumsSlice.actions;
export default cachedArtistAlbumsSlice.reducer;
