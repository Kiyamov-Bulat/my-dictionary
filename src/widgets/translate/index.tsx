import React, {FC, useCallback, useState} from 'react';
import styles from './styles.module.scss';
import {debounce} from 'lodash';
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
    const transLang = useSelector(selectTransLang);
    const [translation, setTranslation] = useState<TranslationUnit | null>(null);
    const onTextChange = useCallback(debounce((value: string) => {
        if (value === '') {
            setTranslation(null);
            return;
        }
        TranslationUnitModel.translate(value, DEFAULT_TEXT_LANG, transLang)
            .then((translation) => setTranslation(translation));
    }, 2000), [transLang]);

    const onAdd = () => {
        if (!translation) {
            Notice.warn('Пустая строка!');
            return;
        }

        dispatch(addTranslationUnit(translation));
        setTranslation(null);
    };

    const onTransLangChange = (lang: string): boolean => {
        if (!lang) {
            return true;
        }
        dispatch(setTransLang(lang));
        ConfigurationModel.saveTransLang(lang);
        return false;
    };

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
                    hotkey={HOTKEYS.FOCUS_TRANSLATE}
                    onAdd={onAdd}
                    textFieldProps={{
                        className: styles.addField,
                        multiline: extended,
                        onChange: onTextChange,
                        maxLength: 1000
                    }}
                />
            </div>
        </div>
    );
};

export default Translate;