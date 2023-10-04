import {configureStore} from '@reduxjs/toolkit';
import dictionary from './slices/dictionary';
import user from './slices/user';
import configuration from './slices/configuration';
import game from './slices/game';
import note from './slices/note';

export const store = configureStore({
    reducer: {
        user,
        dictionary,
        configuration,
        game,
        note,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;