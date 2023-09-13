import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import TranslationUnitModel from '../../models/translationUnit';
import {TranslationUnit} from '../../models/types';
import {useDispatch, useSelector} from 'react-redux';
import {selectTextLang, selectTransLang} from '../../store/selectors/configuration';
import AddField from '../../components/addField';
import {addTranslationUnit} from '../../store/slices/dictionary';
import cx from 'classnames';
import Notice from '../../components/notice';
import HOTKEYS from '../../utils/hotkeys';
import Languages from './languages';

export type TranslateProps = {
    extended?: boolean
    className?: string
    placeholder?: string
}

const Translate: FC<TranslateProps> = ({ extended = false, className, placeholder = '' }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [translation, setTranslation] = useState<TranslationUnit | null>(null);
    const $translateTimeoutId = useRef<number | null>(null);
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);

    const onAdd = async (): Promise<void> => {
        if (!text) {
            Notice.warn('Пустая строка!');
            return;
        }
        let unit = translation as TranslationUnit;

        if (!translation || translation.text !== text) {
            $translateTimeoutId.current && window.clearTimeout($translateTimeoutId.current);
            $translateTimeoutId.current = null;
            unit = await TranslationUnitModel.translate(text, textLang, transLang);
        }

        dispatch(addTranslationUnit(unit));
        setTranslation(null);
        setText('');
    };
    
    useEffect(() => {
        if (!text) {
            setTranslation(null);
            return;
        }

        $translateTimeoutId.current = window.setTimeout(() => {
            TranslationUnitModel.translate(text, textLang, transLang).then(setTranslation);
        }, 1500);

        return () => {
            $translateTimeoutId.current && window.clearTimeout($translateTimeoutId.current);
            $translateTimeoutId.current = null;
        };
    }, [textLang, transLang, text]);

    return (
        <div className={cx(styles.translateContainer, className)}>
            <div className={styles.translation}>
                <Languages/>
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