import {useWordsContext} from '../wordsContext';

const useWordsStatistics = () => {
    const { words } = useWordsContext();
    const wordsWOSpaces = words.filter((w) => !/\s+/.test(w));
    const letters = wordsWOSpaces.reduce((acc, word) => acc + word.length, 0);

    return {
        words: wordsWOSpaces.length,
        letters,
    };
};

export default useWordsStatistics;