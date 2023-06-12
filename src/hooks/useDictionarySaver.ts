import {useEffect} from 'react';
import {selectDictionaryValue} from '../store/selectors/dictionary';
import store from '../store';
import DictionaryModel from '../models/dictionary';

const useDictionarySaver = (): void => {
    useEffect(() => {
        let dictionary = selectDictionaryValue(store.getState());

        return store.subscribe(() => {
            const updatedDictionary = selectDictionaryValue(store.getState());

            if (dictionary !== updatedDictionary) {
                DictionaryModel.save(updatedDictionary);
                dictionary = updatedDictionary;
            }
        });
    }, []);
};

export default useDictionarySaver;