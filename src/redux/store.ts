/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit';
import focusedElementReducer from 'redux/slices/focusedElementSlice';

const store = configureStore({
  reducer: {
    focusedElement: focusedElementReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
