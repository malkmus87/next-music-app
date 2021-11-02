/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const focusedElementSlice = createSlice({
  name: 'focusedElement',
  initialState: {
    value: null,
  },
  reducers: {
    setValue: (state:any, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
    // increment: (state: any) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state: any) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state: any, action: any) => {
    //   state.value += action.payload;
    // },
  },
});
export default focusedElementSlice.reducer;
