import {useCallback, useEffect, useRef, useState} from 'react';
import TranslationUnitModel from '../../../../models/translationUnit';
import {TranslationUnit} from '../../../../models/types';
import {useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../../../store/selectors/configuration';
import {useWordsContext} from '../wordsContext';

const CACHED_UNITS = {} as Record<string, TranslationUnit>;

const useTranslation = (text: string, reverse = false): [TranslationUnit | null, () => void] => {
    const [unit, setUnit] = useState<TranslationUnit | null>(null);
    const { wordsInGroups } = useWordsContext();
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);
    const translate = useCallback(() => {
        const toFind = TranslationUnitModel.normalize({ text, textLang, transLang });

        if (unit && TranslationUnitModel.isEqual(toFind, unit, false)) { return; }

        const cachedUnit = [...Object.values(CACHED_UNITS), ...wordsInGroups].find((u) =>
            TranslationUnitModel.isEqual(toFind, u, false)) || null;

        if (cachedUnit) {
            setUnit(reverse ? TranslationUnitModel.swapTextAndTranslation(cachedUnit) : cachedUnit);
            return;
        }

        TranslationUnitModel
            .translate(text, textLang, transLang)
            .then((unit) => {
                if (unit.text === unit.translation) {
                    return new Promise<TranslationUnit>(resolve => {
                        setTimeout(() =>
                                resolve(TranslationUnitModel.translate(text, transLang, textLang))
                            , 300);
                    });
                }
                return unit;
            })
            .then((unit) => CACHED_UNITS[unit.id] = unit)
            .then((unit) => reverse ? TranslationUnitModel.swapTextAndTranslation(unit) : unit)
            .then(setUnit);
    }, [text, textLang, transLang, wordsInGroups, unit, reverse]);

    useEffect(() => setUnit(null), [text, textLang, transLang]);

    return [unit, translate];
};

export default useTranslation;