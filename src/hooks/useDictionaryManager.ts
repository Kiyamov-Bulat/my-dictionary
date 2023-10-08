import {useEffect} from 'react';
import {selectDictionaryValue} from '../store/selectors/dictionary';
import store from '../store';
import DictionaryModel from '../models/dictionary';
import {useDispatch} from 'react-redux';
import {setDictionary} from '../store/slices/dictionary';

const useDictionaryManager = (): void => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        let dictionary = selectDictionaryValue(store.getState());

        return store.subscribe(() => {
            const updatedDictionary = selectDictionaryValue(store.getState());

            if (dictionary !== updatedDictionary) {
                DictionaryModel.save(updatedDictionary)
                    .catch((err) => console.error('Failed to save dictionary', err));
                dictionary = updatedDictionary;
            }
        });
    }, []);

    useEffect(() => {
        DictionaryModel.get()
            .then((dict) => {
                console.log(dict)
                dispatch(setDictionary(dict))
            })
            .catch((err) => console.error('Failed to get dictionary', err));
    }, []);
};

export default useDictionaryManager;