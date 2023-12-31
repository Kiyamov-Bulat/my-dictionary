import React, {createContext, FC, PropsWithChildren, useContext, useMemo, useState} from 'react';
import {useNoteText} from '../../noteContext';
import isSpace, {SPACES_REGEX} from '../../../../utils/isSpace';
import useWordsInGroups from './useWordsInGroups';
import {TranslationUnit} from '../../../../models/types';

const WordsContext = createContext({
    words: [] as string[],
    wordsWithSpaces: [] as string[],
    wordsInGroups: [] as TranslationUnit[],
    getWordFromGroups: (word: string) => null as TranslationUnit | null,
    reverseTranslate: true,
    setReverseTranslate: (value: boolean | ((value: boolean) => boolean)) => { value; },
});

export const useWordsContext = () => useContext(WordsContext);
export const useWithSpacesWords = () => useWordsContext().wordsWithSpaces;

const WordsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const text = useNoteText();
    const [reverseTranslate, setReverseTranslate] = useState(true);
    const [wordsWithSpaces, words] = useMemo(() => {
        const withSpaces = text.split(SPACES_REGEX) || [];

        return [withSpaces, withSpaces.filter((w) => !isSpace(w))];
    }, [text]);
    const [wordsInGroups, getWordFromGroups] = useWordsInGroups(words);

    const value = useMemo(
        () => ({
            words, wordsWithSpaces,
            wordsInGroups, getWordFromGroups,
            reverseTranslate, setReverseTranslate,
        })
    , [text, reverseTranslate, wordsInGroups]);

    return (
        <WordsContext.Provider value={value}>
            {children}
        </WordsContext.Provider>
    );
};

export default WordsContextProvider;