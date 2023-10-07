import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../../store/selectors/configuration';
import cx from 'classnames';
import TranslationUnitModel from '../../../models/translationUnit';
import styles from './styles.module.scss';
import {TranslationUnit} from '../../../models/types';

type TranslatedTextProps = {
    text: string
    isOpen: boolean
};

const TranslatedText: FC<TranslatedTextProps> = ({ text, isOpen }) => {
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);
    const [unit, setUnit] = useState({} as TranslationUnit);

    useEffect(() => {
        const newUnit = TranslationUnitModel.normalize({ text, textLang, transLang });

        if (!isOpen || TranslationUnitModel.isEqual(unit, newUnit)) { return; }

        TranslationUnitModel
            .translate(text, textLang, transLang)
            .then(setUnit)
            .catch((err) => console.error('Не удалось перевести:', err));
    }, [text, textLang, transLang, isOpen, unit]);

    return (
        <div className={cx(styles.translatedTextContainer, { [styles.isOpen]: isOpen })}>
            {isOpen && <p className={styles.translatedText}>
                {unit.translation}
            </p>}
        </div>
    );
};

export default TranslatedText;