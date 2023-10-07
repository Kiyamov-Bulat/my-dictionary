import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../../store/selectors/configuration';
import cx from 'classnames';
import TranslationUnitModel from '../../../models/translationUnit';
import styles from './styles.module.scss';
import {TranslationUnit} from '../../../models/types';
import {useNoteText} from '../noteContext';
import Button from '../../../components/button';
import {ArrowDownIcon} from '../../../icons';
import useModalState from '../../../hooks/useModalState';

const TranslatedText: FC = () => {
    const text = useNoteText();
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);
    const [unit, setUnit] = useState({} as TranslationUnit);
    const { isOpen, toggle } = useModalState(false);

    useEffect(() => {
        const newUnit = TranslationUnitModel.normalize({ text, textLang, transLang });

        if (!isOpen || TranslationUnitModel.isEqual(unit, newUnit)) { return; }

        TranslationUnitModel
            .translate(text, textLang, transLang)
            .then(setUnit)
            .catch((err) => console.error('Не удалось перевести:', err));
    }, [text, textLang, transLang, isOpen, unit]);

    return (
        <>
            <div className={styles.btnsPanel}>
                <Button
                    variant={'primary'}
                    onClick={toggle}
                    className={cx(styles.openTranslatedTextBtn, { [styles.isOpen]: isOpen })}
                >
                    <ArrowDownIcon fill={'white'}/>
                </Button>
            </div>
            <div className={cx(styles.translatedTextContainer, { [styles.isOpen]: isOpen })}>
                {isOpen && <p className={styles.translatedText}>
                    {unit.translation}
                </p>}
            </div>
        </>
    );
};

export default TranslatedText;