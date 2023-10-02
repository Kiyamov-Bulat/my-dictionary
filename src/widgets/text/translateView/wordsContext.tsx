import React, {createContext, FC, PropsWithChildren, useState} from 'react';
import dataBox from '../../../components/dataBox';
import store from '../../../store';

const WordsContext = createContext({
    wordsInGroups: [],
});

const WordsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [wordsInGroups, setWordsInGroups] = useState(() => store.getState());

    return (
        <WordsContext.Provider value={{ wordsInGroups: [] }}>
            {children}
        </WordsContext.Provider>
    );
};