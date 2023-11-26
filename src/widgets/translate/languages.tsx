import React, {FC} from 'react';
import styles from './styles.module.scss';
import EditableLabel from '../../components/editableLabel';
import ConfigurationModel from '../../models/configuration';
import {useDispatch, useSelector} from 'react-redux';
import {setTextLang, setTransLang} from '../../store/slices/configuration';
import {selectTextLang, selectTransLang} from '../../store/selectors/configuration';
import cx from 'classnames';
import {SwapIcon} from '../../icons';

type HeaderProps = {
    className?: string
};

const Languages: FC<HeaderProps> = ({ className }) => {
    const textLang = useSelector(selectTextLang);
    const transLang = useSelector(selectTransLang);

    const onTextLangChange = (lang: string): boolean => {
        if (!lang) { return true; }
        ConfigurationModel.saveTextLang(lang);
        return false;
    };
    const onTransLangChange = (lang: string): boolean => {
        if (!lang) { return true; }
        ConfigurationModel.saveTransLang(lang);
        return false;
    };
    
    const onSwapLangs = (): void => {
        onTransLangChange(textLang);
        onTextLangChange(transLang);
    };
    return (
        <div className={cx(styles.transLangContainer, className)}>
            Перевод (
            <EditableLabel
                maxLength={4}
                className={styles.transLang}
                value={textLang}
                onSetInactive={onTextLangChange}/>
            <SwapIcon className={styles.swap} onClick={onSwapLangs}/>
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