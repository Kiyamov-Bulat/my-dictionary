import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: { name: '' },
    reducers: {
        increment(state) {
            state.name += '';
        },
    },
});

export default user.reducer;