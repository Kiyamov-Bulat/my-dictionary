import {useCallback, useMemo} from 'react';
import TranslationUnitModel from '../../../../models/translationUnit';
import {useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../../../store/selectors/configuration';
import {selectSelectedGroupsUnits} from '../../../../store/selectors/dictionary';
import {TranslationUnit} from '../../../../models/types';

const useWordsInGroups = (words: string[]) => {
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);
    const selectedGroupsUnits = useSelector(selectSelectedGroupsUnits);
    const wordsInGroups = useMemo(() => {
        const res = [];

        // @TODO убрать повторы
        for (const word of words) {
            const wordUnit = TranslationUnitModel.normalize(
                { text: word, textLang, transLang }
            );

            for (const u of selectedGroupsUnits) {
                if (TranslationUnitModel.isEqual(wordUnit, u, false)) {
                    res.push(u);
                }
            }
        }
        return res;
    }, [selectedGroupsUnits, textLang, transLang, words]);

    const hasWord = useCallback((word: string) => {
        const wordUnit = TranslationUnitModel.normalize(
            { text: word, textLang, transLang }
        );

        return wordsInGroups.some((u) => TranslationUnitModel.isEqual(wordUnit, u, false));
    }, [wordsInGroups, textLang, transLang]);

    return [wordsInGroups, hasWord] as [TranslationUnit[], (word: string) => boolean];
};

export default useWordsInGroups;