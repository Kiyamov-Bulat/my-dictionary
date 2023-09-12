import React, {FC} from 'react';
import styles from './styles.module.scss';
import EditableLabel from '../../components/editableLabel';
import ConfigurationModel from '../../models/configuration';
import {useDispatch} from 'react-redux';
import {setTextLang, setTransLang} from '../../store/slices/configuration';

type HeaderProps = {
    textLang: string
    transLang: string
};

const Header: FC<HeaderProps> = ({ transLang, textLang }) => {
   const dispatch = useDispatch();
    const onTextLangChange = (lang: string): boolean => {
        if (!lang) { return true; }
        dispatch(setTextLang(lang));
        ConfigurationModel.saveTextLang(lang);
        return false;
    };
    const onTransLangChange = (lang: string): boolean => {
        if (!lang) { return true; }
        dispatch(setTransLang(lang));
        ConfigurationModel.saveTransLang(lang);
        return false;
    };
    return (
        <div className={styles.transLangContainer}>
            Перевод (
            <EditableLabel
                maxLength={4}
                className={styles.transLang}
                value={textLang}
                onSetInactive={onTextLangChange}/>
            { '=>' }
            <EditableLabel
                maxLength={3}
                className={styles.transLang}
                value={transLang}
                onSetInactive={onTransLangChange}/>
            ):
        </div>
    );
};

export default Header;