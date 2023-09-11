import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import TranslationUnitModel from '../../models/translationUnit';
import {TranslationUnit} from '../../models/types';
import {useDispatch, useSelector} from 'react-redux';
import {selectTransLang} from '../../store/selectors/configuration';
import AddField from '../../components/addField';
import {addTranslationUnit} from '../../store/slices/dictionary';
import cx from 'classnames';
import EditableLabel from '../../components/editableLabel';
import Notice from '../../components/notice';
import ConfigurationModel, {DEFAULT_TEXT_LANG} from '../../models/configuration';
import {setTransLang} from '../../store/slices/configuration';
import HOTKEYS from '../../utils/hotkeys';

export type TranslateProps = {
    extended?: boolean
    className?: string
    placeholder?: string
}

const Translate: FC<TranslateProps> = ({ extended = false, className, placeholder = '' }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const transLang = useSelector(selectTransLang);
    const [translation, setTranslation] = useState<TranslationUnit | null>(null);
    const $translateTimeoutId = useRef<number | null>(null);

    const onAdd = async (): Promise<void> => {
        if (!text) {
            Notice.warn('Пустая строка!');
            return;
        }
        let unit = translation as TranslationUnit;

        if (!translation || translation.text !== text) {
            $translateTimeoutId.current && window.clearTimeout($translateTimeoutId.current);
            $translateTimeoutId.current = null;
            unit = await TranslationUnitModel.translate(text, DEFAULT_TEXT_LANG, transLang);
        }
        console.trace();

        dispatch(addTranslationUnit(unit));
        setTranslation(null);
        setText('');
    };

    const onTransLangChange = (lang: string): boolean => {
        if (!lang) {
            return true;
        }
        dispatch(setTransLang(lang));
        ConfigurationModel.saveTransLang(lang);
        return false;
    };
    
    useEffect(() => {
        if (!text) {
            setTranslation(null);
            return;
        }

        $translateTimeoutId.current = window.setTimeout(() => {
            TranslationUnitModel.translate(text, DEFAULT_TEXT_LANG, transLang).then(setTranslation);
        }, 1500);

        return () => {
            $translateTimeoutId.current && window.clearTimeout($translateTimeoutId.current);
            $translateTimeoutId.current = null;
        };
    }, [transLang, text]);

    return (
        <div className={cx(styles.translateContainer, className)}>
            <div className={styles.translation}>
                <div className={styles.transLangContainer}>
                    Перевод (
                    <EditableLabel
                        maxLength={3}
                        className={styles.transLang}
                        value={transLang}
                        onSetInactive={onTransLangChange}/>
                    ):
                </div>
                <p className={cx({ [styles.placeholder]: !translation?.translation })}>
                    {translation?.translation || placeholder}
                </p>
            </div>
            <div>
                <AddField
                    hotkey={HOTKEYS.FOCUS_TRANSLATE.key}
                    onAdd={onAdd}
                    textFieldProps={{
                        value: text,
                        className: styles.addField,
                        multiline: extended,
                        onChange: setText,
                        maxLength: 1000
                    }}
                />
            </div>
        </div>
    );
};

export default Translate;