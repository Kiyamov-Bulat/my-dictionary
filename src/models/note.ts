import {BaseObject} from './types';
import {v4 as uuidv4} from 'uuid';
import {get as idbGet, set as idbSet} from 'idb-keyval';
import {selectSelectedGroupsIds} from '../store/selectors/dictionary';
import store from '../store';
import {addNote, updateNote} from '../store/slices/note';
import {selectNotes} from '../store/selectors/note';
import {map} from 'lodash';
import normalizeObject from '../utils/normalize';

const NOTES_STORAGE_KEY = 'notes';
const CACHED_NOTE_STORAGE_KEY = 'text';

export interface Note extends BaseObject {
    groups: string[]
    text: string
    title: string
    tags: string[]
}

export interface CachedNote {
    value: Note,
    added: boolean
}

const isCachedNote = (note: any): note is CachedNote => {
    return note && ('added' in note) && ('value' in note);
};

const NoteModel = {
    create(text = ''): Note {
        const now = Date.now();
        
        return {
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
            groups: [],
            tags: [],
            title: '',
            text,
        };
    },

    saveAll(note: Note[]): Promise<void> {
        return idbSet(NOTES_STORAGE_KEY, JSON.stringify(note));
    },

    isNote(note: any): note is Note {
        return typeof note === 'object' && typeof note.text === 'string' && typeof note.title === 'string';
    },

    async getAll(): Promise<Note[]> {
        try {
            const rawNotes = await idbGet(NOTES_STORAGE_KEY);

            if (!rawNotes) {
                return [];
            }
            const notes = JSON.parse(rawNotes);
            
            if (Array.isArray(notes)) {
                return notes.reduce(
                    (acc, curr) => this.isNote(curr) ? [...acc, this.normalize(curr)] : acc, [] as Note[]);
            }
            throw new Error('Invalid type');
        } catch (err) {
            console.error('[Note.getAll] indexeddb error:', err);
        }
        return [];
    },

    saveInCache(note: CachedNote): void {
        localStorage.setItem(CACHED_NOTE_STORAGE_KEY, JSON.stringify(note));
    },

    getCached(): CachedNote {
        const item = localStorage.getItem(CACHED_NOTE_STORAGE_KEY);
        
        if (item) {
            try {
                const cachedNote = JSON.parse(item);
                
                if (isCachedNote(cachedNote)) {
                    return { ...cachedNote, value: this.normalize(cachedNote.value) };
                }
                throw new Error('Invalid cache');
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
    },

    normalize(note: Partial<Note>): Note {
        return normalizeObject(this, note);
    },

    parse(rawNote: string): Note | null {
        try {
            const note = JSON.parse(rawNote);

            if (note && typeof note === 'object') {
                return this.normalize(note);
            }
        } catch (e) {/* pass */}

        return null;
    }
};

export default NoteModel;