import {RootState} from '../index';
import {Note} from '../../models/note';

const selectNoteState = (state: RootState) => state.note;
export const selectNotes = (state: RootState): Note[] => selectNoteState(state).notes;