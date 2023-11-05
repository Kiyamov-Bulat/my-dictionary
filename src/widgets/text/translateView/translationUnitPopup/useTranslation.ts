import {useCallback, useEffect, useRef, useState} from 'react';
import TranslationUnitModel from '../../../../models/translationUnit';
import {TranslationUnit} from '../../../../models/types';
import {useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../../../store/selectors/configuration';
import {useWordsContext} from '../wordsContext';

const useTranslation = (text: string, reverse = false): [TranslationUnit | null, () => void] => {
    const [unit, setUnit] = useState<TranslationUnit | null>(null);
    const $reversed = useRef(false);
    const { cachedUnits, wordsInGroups, saveCachedUnit } = useWordsContext();
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);
    const translate = useCallback(() => {
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
            .then((unit) => $reversed.current ? TranslationUnitModel.swapTextAndTranslation(unit) : unit)
            .then((unit) => {
                setUnit(unit);
                saveCachedUnit(unit);
            });
    }, [text, textLang, transLang]);

    useEffect(() => {
        if (unit) { return; }
        
        const toFind = TranslationUnitModel.normalize({ text, textLang, transLang });
        const savedUnits = [...cachedUnits, ...wordsInGroups];
        let cachedUnit = savedUnits.find((u) => TranslationUnitModel.isEqual(u, toFind, false)) || null;

        if (cachedUnit && cachedUnit.textLang !== textLang) {
            cachedUnit = TranslationUnitModel.swapTextAndTranslation(cachedUnit);
        }

        setUnit(cachedUnit);
    }, [text, textLang, transLang, cachedUnits, wordsInGroups]);

    useEffect(() => {
        if (unit && reverse !== $reversed.current) {
            setUnit(TranslationUnitModel.swapTextAndTranslation(unit));
        }
        $reversed.current = reverse;
    }, [reverse]);

    return [unit, translate];
};

export default useTranslation;