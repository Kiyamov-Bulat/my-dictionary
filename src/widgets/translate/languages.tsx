import React, {FC} from 'react';
import styles from './styles.module.scss';
import EditableLabel from '../../components/editableLabel';
import ConfigurationModel from '../../models/configuration';
import {useDispatch, useSelector} from 'react-redux';
import {setTextLang, setTransLang} from '../../store/slices/configuration';
import {selectTextLang, selectTransLang} from '../../store/selectors/configuration';
import cx from 'classnames';

type HeaderProps = {
    className?: string
};

const Languages: FC<HeaderProps> = ({ className }) => {
   const dispatch = useDispatch();
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);

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
        <div className={cx(styles.transLangContainer, className)}>
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

export default Languages;