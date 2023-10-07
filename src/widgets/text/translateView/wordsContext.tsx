import React, {createContext, FC, PropsWithChildren, useContext, useMemo, useState} from 'react';
import store from '../../../store';
import {useNoteText} from '../noteContext';
import {SPACES_REGEX} from '../../../utils/isSpace';

const WordsContext = createContext({
    words: [] as string[],
    wordsInGroups: [],
    reverseTranslate: true,
    setReverseTranslate: (value: boolean | ((value: boolean) => boolean)) => { value; }
});

export const useWordsContext = () => useContext(WordsContext);
export const useWords = () => useWordsContext().words;

const WordsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const text = useNoteText();
    const words = useMemo(() => text.split(SPACES_REGEX) || [], [text]);
    const [wordsInGroups, setWordsInGroups] = useState(() => store.getState());
    const [reverseTranslate, setReverseTranslate] = useState(true);

    return (
        <WordsContext.Provider value={{ words, wordsInGroups: [], reverseTranslate, setReverseTranslate }}>
            {children}
        </WordsContext.Provider>
    );
};

export default WordsContextProvider;