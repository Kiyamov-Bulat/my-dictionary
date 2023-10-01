import React, {FC, useEffect, useState} from 'react';
import useModalState from '../../../hooks/useModalState';
import {useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../../store/selectors/configuration';
import Button from '../../../components/button';
import {ArrowDownIcon} from '../../../icons';
import cx from 'classnames';
import TranslationUnitModel from '../../../models/translationUnit';
import styles from './styles.module.scss';

type TranslatedTextProps = {
    text: string
};

const TranslatedText: FC<TranslatedTextProps> = ({ text }) => {
    const { isOpen, toggle } = useModalState(false);
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);
    const [translatedText, setTranslatedText] = useState('');

    useEffect(() => {
        TranslationUnitModel
            .translate(text, textLang, transLang)
            .then((u) => setTranslatedText(u.translation))
            .catch((err) => console.error('Не удалось перевести:', err));
    }, [text, textLang, transLang]);

    return (
        <div className={cx(styles.translatedTextContainer, { [styles.isOpen]: isOpen })}>
            <Button
                variant={'primary'}
                onClick={toggle}
                className={styles.openTranslatedTextBtn}
            >
                <ArrowDownIcon fill={'white'}/>
            </Button>
            {isOpen && <p className={styles.translatedText}>
                {translatedText}
            </p>}
        </div>
    );
};

export default TranslatedText;