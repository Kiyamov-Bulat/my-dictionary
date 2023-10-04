import {BaseObject} from './types';
import {v4 as uuidv4} from 'uuid';
import {get as idbGet, set as idbSet} from 'idb-keyval';

const LOCAL_STORAGE_KEY = 'notes';

export interface Note extends BaseObject {
    groups: string[]
    text: string
    title: string
}

const NoteModel = {
    create(text: string): Note {
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
        return idbSet(LOCAL_STORAGE_KEY, JSON.stringify(note));
    },

    async getAll(): Promise<Note[]> {
        try {
            return (await idbGet(LOCAL_STORAGE_KEY)) || [];
        } catch (err) {
            console.error('[Note.getAll] indexeddb error:', err);
            return [];
        }
    }
};

export default NoteModel;