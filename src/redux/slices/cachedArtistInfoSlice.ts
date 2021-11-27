/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const MAXIMUM_NUMBER_OF_CACHED_ARTISTS = 5;
const cachedArtistInfoSlice = createSlice({
  name: 'cachedArtistData',
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state:any, action: PayloadAction<any | null>) => {
      const artistDataShouldBeAdded = (
        state.value.findIndex((artistData: any) => (
          artistData.musicbrainzID === action.payload.musicbrainzID
        )) < 0
      );
      if (artistDataShouldBeAdded) {
        if (state.value.length >= MAXIMUM_NUMBER_OF_CACHED_ARTISTS) state.value.shift();
        state.value.push(action.payload);
      }
    },
  },
});

export const { addData } = cachedArtistInfoSlice.actions;
export default cachedArtistInfoSlice.reducer;
