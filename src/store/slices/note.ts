import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Note} from '../../models/note';

const noteState = {
    notes: [] as Note[],
};

const noteSlice = createSlice({
    name: 'note',
    initialState: noteState,
    reducers: {
        setNotes(state, { payload }: PayloadAction<Note[]>) {
            state.notes = payload;
        },
        addNote(state, { payload }: PayloadAction<Note>) {
            if (!state.notes.find((note) => note.id === payload.id)) {
                state.notes.push(payload);
            }
        },
        removeNote(state, { payload }: PayloadAction<string>) {
            state.notes = state.notes.filter((note) => note.id !== payload);
        },
        updateNote(state, { payload }: PayloadAction<Note>) {
            const idx = state.notes.findIndex((note) => note.id === payload.id);

            if (idx !== -1) {
                state.notes[idx] = payload;
            }
        }
    },
});

export const {
    setNotes,
    addNote,
    removeNote,
    updateNote,
} = noteSlice.actions;

export default noteSlice.reducer;