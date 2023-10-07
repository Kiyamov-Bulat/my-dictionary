import {BaseObject} from './types';
import {v4 as uuidv4} from 'uuid';
import {get as idbGet, set as idbSet} from 'idb-keyval';
import {selectSelectedGroupsIds} from '../store/selectors/dictionary';
import store from '../store';
import {addNote, updateNote} from '../store/slices/note';
import {selectNotes} from '../store/selectors/note';
import {map} from 'lodash';

const NOTES_STORAGE_KEY = 'notes';
const CACHED_NOTE_STORAGE_KEY = 'text';

export interface Note extends BaseObject {
    groups: string[]
    text: string
    title: string
}

export interface CachedNote {
    value: Note,
    added: boolean
}

const NoteModel = {
    create(text = ''): Note {
        const now = Date.now();
        
        return {
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
            groups: [],
            title: '',
            text,
        };
    },

    saveAll(note: Note[]): Promise<void> {
        return idbSet(NOTES_STORAGE_KEY, JSON.stringify(note));
    },

    async getAll(): Promise<Note[]> {
        try {
            const rawNotes = await idbGet(NOTES_STORAGE_KEY);

            if (!rawNotes) {
                return [];
            }
            return JSON.parse(rawNotes);
        } catch (err) {
            console.error('[Note.getAll] indexeddb error:', err);
            return [];
        }
    },

    saveInCache(note: CachedNote): void {
        localStorage.setItem(CACHED_NOTE_STORAGE_KEY, JSON.stringify(note));
    },

    getCached(): CachedNote {
        const item = localStorage.getItem(CACHED_NOTE_STORAGE_KEY);
        
        if (item) {
            try {
                return JSON.parse(item);
            } catch (err) {
                console.error('[Note.getCached] Failed to parse JSON', err);
            }
        }
        return { value: this.create(), added: false };
    },

    save(note: Note, add: boolean): void {
        const selectedGroups = selectSelectedGroupsIds(store.getState());
        const finalNote = { ...note, groups: selectedGroups };

        this.saveInCache({ value: finalNote, added: add });

        if (!add) { return; }

        if (this.has(finalNote)) {
            store.dispatch(updateNote(finalNote));
        } else {
            store.dispatch(addNote(finalNote));
        }
    },

    has(note: Note): boolean {
        return !!selectNotes(store.getState()).find((n) => n.id === note.id);
    },
    
    clone(note: Note): Note {
        const now = Date.now();
        
        return { ...note, updatedAt: now, createdAt: now, id: uuidv4() };
    }
};

export default NoteModel;