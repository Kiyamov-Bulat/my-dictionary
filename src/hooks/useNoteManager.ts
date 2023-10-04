import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {selectDictionaryValue} from '../store/selectors/dictionary';
import store from '../store';
import DictionaryModel from '../models/dictionary';
import {setDictionary} from '../store/slices/dictionary';
import {selectNotes} from '../store/selectors/note';
import NoteModel from '../models/note';
import {setNotes} from '../store/slices/note';

const useNoteManager = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let note = selectNotes(store.getState());

        return store.subscribe(() => {
            const updatedNote = selectNotes(store.getState());

            if (note !== updatedNote) {
                NoteModel.saveAll(updatedNote)
                    .catch((err) => console.error('Failed to save notes', err));
                note = updatedNote;
            }
        });
    }, []);

    useEffect(() => {
        NoteModel.getAll()
            .then((notes) => dispatch(setNotes(notes)))
            .catch((err) => console.error('Failed to get notes', err));
    }, []);
};

export default useNoteManager;