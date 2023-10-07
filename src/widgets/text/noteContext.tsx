import React, {createContext, FC, PropsWithChildren, useCallback, useContext, useState} from 'react';
import NoteModel, {Note} from '../../models/note';

const NoteContext = createContext({
    note: NoteModel.create(''),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    saveNote: (note: Note, add?: boolean) => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsEdit: (value: boolean) => {},
    added: false,
    isEdit: true,
});

export const useNoteContext = () => useContext(NoteContext);

export const useNoteText = () => useNoteContext().note.text;

const NoteContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [cachedNote, setCachedNote] = useState(() => NoteModel.getCached());
    const [isEdit, setIsEdit] = useState(false);
    const saveNote = useCallback((note: Note, add = cachedNote.added) => {
        NoteModel.save(note, add);
        setCachedNote(NoteModel.getCached());
    }, [cachedNote.added]);
    
    return (
        <NoteContext.Provider value={{ note: cachedNote.value, saveNote, added: cachedNote.added, isEdit, setIsEdit }}>
            {children}
        </NoteContext.Provider>
    );
};

export default NoteContextProvider;