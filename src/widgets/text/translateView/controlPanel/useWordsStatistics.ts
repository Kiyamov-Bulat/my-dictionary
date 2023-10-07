import {useWordsContext} from '../wordsContext';

const useWordsStatistics = () => {
    const { words, wordsInGroups } = useWordsContext();
    const letters = words.reduce((acc, word) => acc + word.length, 0);

    return {
        words: words.length,
        wordsInGroups: wordsInGroups.length,
        letters,
    };
};

export default useWordsStatistics;