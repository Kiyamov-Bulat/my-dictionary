import {selectDictionaryValue} from '../store/selectors/dictionary';
import store from '../store';
import {useEffect} from 'react';
import DictionaryModel from '../models/dictionary';

const useDictionaryImagePreloader = () => {
    useEffect(() => {
        DictionaryModel.preloadImages(selectDictionaryValue(store.getState()));
    }, []);
};

export default useDictionaryImagePreloader;