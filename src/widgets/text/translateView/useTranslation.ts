import {useEffect, useState} from 'react';
import TranslationUnitModel from '../../../models/translationUnit';
import {TranslationUnit} from '../../../models/types';
import {useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../../store/selectors/configuration';

const useTranslation = (text: string, reverse = false) => {
    const [unit, setUnit] = useState<TranslationUnit | null>(null);
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);

    useEffect(() => {
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
            .then((unit) => reverse ? TranslationUnitModel.swapTextAndTranslation(unit) : unit)
            .then(setUnit);
    }, [text, textLang, transLang, reverse]);

    return unit;
};

export default useTranslation;